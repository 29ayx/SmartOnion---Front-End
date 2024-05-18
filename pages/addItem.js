'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TitleBar from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import SessionMaster from '../SessionManager';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [notification, setNotification] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        calories: '',
        expiryDate: '',
        crucial: false,
        notifyBefore: ''
    });
    const router = useRouter();

    useEffect(() => {
        const userEmail = SessionMaster.get('userEmail');
        setEmail(userEmail);
        if (!userEmail) {
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, crucial: e.target.checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/add-inventory', { ...formData, email });
            if (response.status === 200) {
                setNotification('success');
                setFormData({
                    name: '',
                    quantity: '',
                    calories: '',
                    expiryDate: '',
                    crucial: false,
                    notifyBefore: ''
                });
            } else {
                setNotification('error');
                console.error('Failed to add item', response.data.error);
            }
        } catch (error) {
            setNotification('error');
        }
        setTimeout(() => {
            setNotification('');
        }, 2000);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <TitleBar title="Add Item"/>
            <div className='container-fluid'>
                <div className='col-xl-6 col-lg-6'>
                    {notification === 'success' && (
                        <div className="alert alert-success solid alert-dismissible fade show">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                                <polyline points="9 11 12 14 22 4"></polyline>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                            <strong>Item Added Successfully!</strong>
                        </div>
                    )}
                    {notification === 'error' && (
                        <div className="alert alert-danger solid alert-dismissible fade show">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                            <strong>Failed to Add Item!</strong>
                        </div>
                    )}
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='card-title'>Add Item To Inventory</h4>
                        </div>
                        <div className='card-body'>
                            <div className='basic-form'>
                                <form onSubmit={handleSubmit}>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            className='form-control input-default'
                                            placeholder='Item Name'
                                            name='name'
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='number'
                                            className='form-control input-default'
                                            placeholder='Quantity'
                                            name='quantity'
                                            value={formData.quantity}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='number'
                                            className='form-control input-default'
                                            placeholder='Calories'
                                            name='calories'
                                            value={formData.calories}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label>Product Expiring On:</label>
                                        <input
                                            type='date'
                                            className='form-control input-default'
                                            placeholder='Expiry Date'
                                            name='expiryDate'
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className='form-check mb-3 form-check-inline'>
                                        <label className='form-check-label'>
                                            <input
                                                type='checkbox'
                                                className='form-check-input'
                                                value='true'
                                                checked={formData.crucial}
                                                onChange={handleCheckboxChange}
                                            />Is Crucial {" - 'We notify when the item is crucial and less than '"}
                                        </label>
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='number'
                                            className='form-control input-default'
                                            placeholder='Notify Before'
                                            name='notifyBefore'
                                            value={formData.notifyBefore}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <input
                                        type='submit'
                                        className='btn w-100 text-white bg-success fs-18'
                                        value='Add Item'
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
