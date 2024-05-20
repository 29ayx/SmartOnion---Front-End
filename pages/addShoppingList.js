import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import SessionMaster from '../SessionManager';
import Cookie from 'js-cookie';

const AddShoppingList = () => {
    const [name, setName] = useState('');
    const [items, setItems] = useState([{ name: '', quantity: 1 }]);
    const [error, setError] = useState('');
    const [notification, setNotification] = useState('');
    const router = useRouter();
    const email = Cookie.get('userEmail') || SessionMaster.get('userEmail');

    const handleAddItem = () => {
        setItems([...items, { name: '', quantity: 1 }]);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleSave = async () => {
        try {
            const response = await axios.post(`/api/save-shoppinglist`, {
                email,
                description: name,
                shoppingItems: items
            });
            if (response.status === 200) {
                setNotification('success');
                setTimeout(() => {
                    router.push('/shoppinglist');
                }, 1500);
                
            } else {
                throw new Error('Failed to save shopping list');
            }
        } catch (err) {
            setError(err.message);
            setNotification('error');
        }
    };

    const handleDeleteItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Add Shopping List</h4>
                        </div>
                        <div className="card-body">
                            {notification === 'success' && (
                                <div className="alert alert-success solid alert-dismissible fade show">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                                        <polyline points="9 11 12 14 22 4"></polyline>
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                    </svg>
                                    <strong>Added Successfully!</strong>
                                </div>
                            )}
                            {notification === 'error' && (
                                <div className="alert alert-danger solid alert-dismissible fade show">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                    <strong>Failed to Add !</strong>
                                </div>
                            )}
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Items</label>
                                {items.map((item, index) => (
                                    <div key={index} className="d-flex mb-2">
                                        <input
                                            type="text"
                                            className="form-control me-2"
                                            placeholder="Item Name"
                                            value={item.name}
                                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            className="form-control me-2"
                                            placeholder="Quantity"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                        />
                                        <button className="btn btn-danger" onClick={() => handleDeleteItem(index)}>Delete</button>
                                    </div>
                                ))}
                                <button className="btn btn-primary" onClick={handleAddItem}>Add Item</button>
                            </div>
                            <button className="btn btn-success mt-3" onClick={handleSave}>Save Shopping List</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddShoppingList;
