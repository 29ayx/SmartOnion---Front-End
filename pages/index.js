import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TitleBar from '../components/header';
import Cookies from 'js-cookie';
import WelcomeUser from '../components/welcome-user';
import InventoryItems from '../components/inventory';
import Footer from '../components/footer';
import SessionMaster from '../SessionManager'
import HealthGoal from '../components/healthGoal';


const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const mail = Cookies.get('userEmail');
    
    useEffect(() => {
        const profileId = Cookies.get('profileId');

        if (!profileId) {
                router.push('/selectProfile');
        } else {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
        <TitleBar title="Welcome Home"/>
        <div className='container-fluid'>
            <WelcomeUser />
            <HealthGoal />
            <InventoryItems />
        </div>
        <Footer />
        </>
    );
};

export default Dashboard;
