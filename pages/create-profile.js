import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TitleBar from '../components/Headers/header_profile';
import Footer from '../components/footer';
import SessionMaster from '../SessionManager';
import Loading from '../components/loading';
import axios from 'axios';

const Dashboard = () => {
    const [notification, setNotification] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        userEmail: '',
        dob: '',
        dietgoal: '',
        allergies: '',
    });
    const router = useRouter();

    useEffect(() => {
        const userEmail = SessionMaster.get('userEmail');
        const profileId = SessionMaster.get('profileId');

        if (!userEmail) {
            router.push('/login');
        } else {
            setEmail(userEmail);
            setFormData((prevFormData) => ({
                ...prevFormData,
                userEmail: userEmail,
            }));
            setLoading(false);
        }
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/create-profile`, formData);
            if (response.status === 200) {
                setNotification('success');
                router.push('/selectProfile')
            } else {
                setNotification('error');
                console.error('Failed to create profile', response.data.error);
            }
        } catch (error) {
            setNotification('error');
        }
        setTimeout(() => {
            setNotification('');
        }, 2000);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <TitleBar title="Create Profile" />
            
            <div className='container-fluid'>
                {notification === 'success' && (
                    <div className="alert alert-success solid alert-dismissible fade show">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <strong>Profile Created Successfully!</strong>
                    </div>
                )}
                {notification === 'error' && (
                    <div className="alert alert-danger solid alert-dismissible fade show">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <strong>Failed to Create Profile!</strong>
                    </div>
                )}
                <div className='card'>
                    <div className='card-header'>
                        <h4 className='card-title'>Create Profile</h4>
                    </div>
                    <div className='card-body'>
                        <div className='basic-form'>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor='name' className='form-label'>Name</label>
                                    <input
                                        type='text'
                                        className='form-control input-default'
                                        placeholder='Name'
                                        id='name'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='dob' className='form-label'>Date of Birth</label>
                                    <input
                                        type='date'
                                        className='form-control input-default'
                                        placeholder='Date of Birth'
                                        id='dob'
                                        name='dob'
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='dietgoal' className='form-label'>Diet Goal {"(Calories goal per day)"} </label>
                                    <input
                                        type='number'
                                        className='form-control input-default'
                                        placeholder='Diet Goal'
                                        id='dietgoal'
                                        name='dietgoal'
                                        value={formData.dietgoal}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='allergies' className='form-label'>Allergy (Enter None - If none)</label>
                                    <input
                                        type='text'
                                        className='form-control input-default'
                                        placeholder='Allergy'
                                        id='allergies'
                                        name='allergies'
                                        value={formData.allergies}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <input
                                    type='submit'
                                    className='btn w-100 text-white bg-success fs-18'
                                    value='Create Profile'
                                />
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
