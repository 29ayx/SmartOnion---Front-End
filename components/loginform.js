import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { useUser } from '../contexts/UserProvider';
import SessionMaster from '../SessionManager'
import Image from 'next/image';
import Link from 'next/link';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [serverMessage, setServerMessage] = useState('');
    const [notification, setNotification] = useState('');
    const router = useRouter();



    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/auth/handle-auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
            setEmail(email)

            Cookie.set('userEmail', email);
            SessionMaster.set('userEmail', email);

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

        

                    
                 
                        

                        <div className='border-dark'>
                            <div className="text-center justify-center">
                            <div className="d-flex justify-content-center align-items-center">
    <Image src="/images/logo.png" alt="logo" height="100" width="100" className="img-fluid mb-3 mt-3" />
</div>

                                <h3 className="title">Access to SmartOnion</h3>
                                <p>Sign in to your account</p>

                                {notification  === "success" && (<div className="alert alert-success solid alert-dismissible fade show">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                                        <polyline points="9 11 12 14 22 4"></polyline>
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                    </svg>
                                    <strong>Login Successful!</strong> Redirecting...
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
                            <form  onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="mb-1 text-dark">Email</label>
                                    <input
                                        type="email"
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
                                <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                    <div className="mb-4">
                                        <a href="page_forgot_password.html" className="btn-link text-primary">Forgot Password?</a>
                                    </div>
                                </div>
                                <div className="text-center mb-4">
                                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                </div>
                                
                                <p className="text-center">Not registered?  
                                    <Link className="btn-link text-primary" href="/register">Register</Link>
                                </p>
                            </form>
                        </div>




    );
};

export default LoginForm;
