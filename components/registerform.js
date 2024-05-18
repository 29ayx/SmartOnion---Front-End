import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUser } from '../contexts/UserProvider';
import SessionMaster from '../SessionManager'
import Image from 'next/image';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [serverMessage, setServerMessage] = useState('');
    const [notification, setNotification] = useState('');
    const router = useRouter();


    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/auth/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
            
            SessionMaster.set('userEmail', email);
            console.log(SessionMaster.get('userEmail'))
            setServerMessage('Login successful')
            setNotification('success')


            setTimeout(() => {
                router.push('/selectProfile');
            }, 1000); // 3-second delay before redirecting
            
            // Redirect or update the UI as necessary
        } else {
            setServerMessage(`Login failed: ${data.error}`);
            setNotification('error')
        }
    };

    return (
        <div className="authincation ">
            <div className="container-fluid">
                <div className="row ">
                    
                    <div className="col-lg-6 col-md-12 col-sm-12 align-self-center">
                        

                        <div className="login-form">
                            <div className="text-center">
                            <Image src="/images/logo.png" alt="logo" height="150" width="150" className="img-fluid mb-3 mt-3" />
                                <h3 className="title">Register your account</h3>
                                <p>The leading smart fridge application</p>

                                {notification  === "success" && (<div className="alert alert-success solid alert-dismissible fade show">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                                        <polyline points="9 11 12 14 22 4"></polyline>
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                    </svg>
                                    <strong>Account created Successful!</strong> Redirecting...
                                </div>)}
                                {notification === 'error' && (
                                <div className="alert alert-danger solid alert-dismissible fade show">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                                        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                                        <line x1="15" y1="9" x2="9" y2="15"></line>
                                        <line x1="9" y1="9" x2="15" y2="15"></line>
                                    </svg>
                                    <strong>{serverMessage && serverMessage}</strong>
                                </div>
                            )}
                            
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="mb-1 text-dark">Email</label>
                                    <input
                                        type="text"
                                        className="form-control form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4 position-relative">
                                    <label className="mb-1 text-dark">Password</label>
                                    <input
                                        type="password"
                                        className="form-control form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span className="show-pass eye">
                                        <i className="fa fa-eye-slash"></i>
                                        <i className="fa fa-eye"></i>
                                    </span>
                                </div>
                                <div className="text-center mb-4">
                                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                                </div>
                                
                                <p className="text-center">Already registered?  
                                    <Link className="btn-link text-primary" href="/login">Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
