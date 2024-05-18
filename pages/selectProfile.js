import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TitleBar from '../components/header';
import Cookies from 'js-cookie';
import WelcomeUser from '../components/welcome-user';
import InventoryItems from '../components/inventory';
import Footer from '../components/footer';
import SessionMaster from '../SessionManager'
import ProfileList from '../components/profile-list';

const SelectProfile = () => {
    const router = useRouter();
    useEffect(() => {

    const email = SessionMaster.get('userEmail');
    if (!email){
        router.push('/login');
    }
    });

    return (
<>
<div className='container-fluid'>
<ProfileList/>
</div>
</>
    );
};

export default SelectProfile;