import React from 'react';
import { useRouter } from 'next/router';
import "../styles/main.css";

const TitleBar = () => {
    const router = useRouter();

    // Function to handle back navigation
    const handleBack = () => {
        router.push('/');
    };
    const featureList = () => {
        router.push('/features');
    };
    const myprofile = () => {
        router.push('/myprofile');
    };

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-white shadow-top fixed-bottom" style={{ marginTop: '1px', padding: '1px 0', height:'55px',sticky : 'true'}}>
            <div className="container-fluid">
                {/* Back button */}
                <button className="btn" onClick={handleBack}>
                    <i className="bi bi-house" style={{ fontSize: '24px' }}></i>
                </button>

                {/* Title */}
                <div className="navbar-brand mx-auto">
                <button className="btn" onClick={featureList}>
                        <i className="bi bi-star" style={{ fontSize: '24px' }}></i>
                    </button>
                </div>

                {/* Settings icon */}
                <div className="text-end" onClick={myprofile}>
                    <button className="btn">
                        <i className="bi bi-person" style={{ fontSize: '24px' }}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TitleBar;
