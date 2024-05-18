import React from 'react';
import { useRouter } from 'next/router';


const TitleBar = (title) => {
    const router = useRouter();

    // Function to handle back navigation
    const handleBack = () => {
        router.back();
    };

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top" style={{ marginBottom: '25px', padding: '2px 0', sticky : 'true'}}>
            <div className="container-fluid">
                {/* Back button */}
                <button className="btn" onClick={handleBack}>
                    <i className="bi bi-arrow-left" style={{ fontSize: '24px' }}></i>
                </button>

                {/* Title */}
                <div className="navbar-brand mx-auto" style={{ fontSize: '24px' }}>
                    {title.title}
                </div>

                {/* Settings icon */}
                <div className="text-end">
                    <button className="btn">
                        <i className="bi bi-gear" style={{ fontSize: '24px' }}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TitleBar;
