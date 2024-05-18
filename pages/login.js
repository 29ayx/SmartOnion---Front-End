import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import Cookies from 'js-cookie';
import LoginForm from '../components/loginform';

const LoginPage = () => {
   

    return (
        <div>
            <LoginForm/>
                </div>
    );
};

export default LoginPage;