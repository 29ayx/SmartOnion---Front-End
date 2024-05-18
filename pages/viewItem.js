import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TitleBar from '../components/Headers/header_profile';
import Cookies from 'js-cookie';
import Footer from '../components/footer';
import SessionMaster from '../SessionManager';
import Loading from '../components/loading';
import axios from 'axios';


const Dashboard = () => {
    const [notification, setNotification] = useState('');
    const [loading, setLoading] = useState(true);
    const [formChanged, setFormChanged] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        itemId: '',
        picture: '',
        name: '',
        expiryDate: '',
        quantity: '',
        calories: '',
        crucial: false,
        notifyBefore: 0.0
    });

    useEffect(() => {
        const userEmail = SessionMaster.get('userEmail');
        const itemId = router.query.itemId;

    
            const fetchItemData = async () => {
                try {
                    const response = await fetch(`/api/get-item?email=${userEmail}&itemId=${itemId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch item data');
                    }
                    const data = await response.json();
                    setFormData({
                        itemId: data.itemId,
                        picture: data.picture,
                        name: data.name,
                        expiryDate: new Date(data.expiryDate).toISOString().split('T')[0],
                        quantity: data.quantity,
                        calories: data.calories,
                        crucial: data.crucial,
                        notifyBefore: data.notifyBefore
                    });
                } catch (err) {
                    console.log(err.message);
                }
            };
            fetchItemData();
        
        setLoading(false);
    }, [router]);

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormChanged(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const email = SessionMaster.get('userEmail');
            const response = await axios.post(`/api/update-item?email=${encodeURIComponent(email)}`, formData);
            if (response.status === 200) {
                setNotification('success');
                setFormChanged(false);
            } else {
                setNotification('error');
            }
        } catch (error) {
            setNotification('error');
        }
        setTimeout(() => {
            setNotification('');
        }, 2000);
    };

    return (
        <>
            <TitleBar title={formData.name} />
            <div className='container-fluid'>
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
                        <strong>Please try again!</strong>
                    </div>
                )}
                <div className='card'>
                    <div className='card-header'>
                        <h4 className='card-title'>Update Item</h4>
                    </div>
                    <div className='card-body'>
                        <div className='basic-form'>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor='name' className='form-label'>Name : {formData.name}</label>
                                    <input
                                        type='text'
                                        className='form-control input-default'
                                        placeholder='Name'
                                        id='name'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        disabled
                                        hidden
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='expiryDate' className='form-label'>Expiry Date : {formData.expiryDate}</label>
                                    <input
                                        type='date'
                                        className='form-control input-default'
                                        placeholder='Expiry Date'
                                        id='expiryDate'
                                        name='expiryDate'
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
                                        disabled
                                        hidden
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='calories' className='form-label'>Calories: {formData.calories}</label>
                                    <input
                                        type='number'
                                        className='form-control input-default'
                                        placeholder='Calories'
                                        id='calories'
                                        name='calories'
                                        value={formData.calories}
                                        onChange={handleInputChange}
                                        hidden
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='quantity' className='form-label'>Quantity</label>
                                    <input
                                        type='number'
                                        className='form-control input-default'
                                        placeholder='Quantity'
                                        id='quantity'
                                        name='quantity'
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                
                                <div className='mb-3'>
                                    <label htmlFor='crucial' className='form-label'>Crucial</label>
                                    <input
                                        type='checkbox'
                                        id='crucial'
                                        name='crucial'
                                        checked={formData.crucial}
                                        onChange={(e) => setFormData({ ...formData, crucial: e.target.checked })}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='notifyBefore' className='form-label'>Notify Before (days)</label>
                                    <input
                                        type='number'
                                        className='form-control input-default'
                                        placeholder='Notify Before'
                                        id='notifyBefore'
                                        name='notifyBefore'
                                        value={formData.notifyBefore}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                {formChanged && (
                                    <input
                                        type='submit'
                                        className='btn w-100 text-white bg-success fs-18'
                                        value='Update Item'
                                    />
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
