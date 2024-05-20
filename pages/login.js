import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import Cookies from 'js-cookie';
import LoginForm from '../components/loginform';

const LoginPage = () => {
    const router = useRouter();
   const userEmail = Cookies.get('userEmail');
  
    return (

            <LoginForm/>

    );
};

export default LoginPage;