const FullPageSpinner = () => {
    return (
        <div style={overlayStyle}>
            <div style={spinnerStyle}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1050, // Bootstrap's z-index scale uses 1050 for modals
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const spinnerStyle = {
    textAlign: 'center'
};

export default FullPageSpinner;