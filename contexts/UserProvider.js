import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';  // Import js-cookie

// Create the context
const UserContext = createContext();

// This function can be used to consume the context in a component
export const useUser = () => useContext(UserContext);

// Provider component that wraps your components in your app
export const UserProvider = ({ children }) => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Fetch the email from cookies on component mount
        const userEmail = Cookies.get('userEmail');
        if (userEmail) {
            setEmail(userEmail);  // Set the email in the context if found
        }
    }, []);

    return (
        <UserContext.Provider value={{ email, setEmail }}>
            {children}
        </UserContext.Provider>
    );
};
