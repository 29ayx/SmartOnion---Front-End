import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import Loading from '../components/loading';
import SessionMaster from '../SessionManager';
import Cookie from 'js-cookie';

const ManageShoppingList = () => {
    const [shoppingList, setShoppingList] = useState(null);
    const [name, setName] = useState('');
    const [items, setItems] = useState([]);
    const [notification, setNotification] = useState([]);
    const [error, setError] = useState('');
    const [formChanged, setFormChanged] = useState(false);
    const router = useRouter();
    const { shoppingListId } = router.query;
    const email = Cookie.get('userEmail');

    useEffect(() => {
        if (!shoppingListId) {
            setError('Missing email or shopping list ID.');
            return;
        }

        const fetchShoppingList = async () => {
            try {
                const response = await fetch(`/api/get-shoppinglist?email=${email}&shoppingListId=${shoppingListId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch shopping list');
                }
                const data = await response.json();
                setShoppingList(data);
                setName(data.description);
                setItems(data.shoppingItems);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchShoppingList();
    }, [email, shoppingListId]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
        setFormChanged(true);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`/api/save-shoppinglist`, {
                email,
                shoppingListId,
                description: name,
                shoppingItems: items
            });
            if (response.status === 200) {
                setNotification('success');
                setFormChanged(false);
            } else {
                setNotification('error');
                throw new Error('Failed to update shopping list');
            }
        } catch (err) {
            setError(err.message);
        }setTimeout(() => {
            setNotification('');
          //   router.reload();
          }, 1500);
        
    };

    const handleAddItem = () => {
        setItems([...items, { name: '', quantity: 1 }]);
    };

    const handleDeleteItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        setFormChanged(true);
    };

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!shoppingList) {
        return <Loading />;
    }

    return (
        <>
            <Header />

            <div className="container">
            {notification === 'success' && (
                                <div className="alert alert-success solid alert-dismissible fade show">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                                        <polyline points="9 11 12 14 22 4"></polyline>
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                    </svg>
                                    <strong>Updated Successfully!</strong>
                                </div>
                            )}
                            {notification === 'error' && (
                                <div className="alert alert-danger solid alert-dismissible fade show">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                    <strong>Failed to Update !</strong>
                                </div>
                            )}
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Manage Shopping List</h4>
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); setFormChanged(true); }}
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
                            {formChanged && (
                                <button className="btn btn-success mt-3" onClick={handleSave}>Update Shopping List</button>
                            )}
                        </div>
                    </div>
                </div>

            <Footer />
        </>
    );
};

export default ManageShoppingList;
