import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from '../components/loading';
import Footer from '../components/footer';
import SessionMaster from '../SessionManager';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import Header from '../components/header';

const ShoppingList = () => {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    
    const email = Cookie.get('userEmail') || SessionMaster.get('userEmail');

    useEffect(() => {
        if (!email) {
            setError('No email provided.');
            setIsLoading(false);
            return;
        }

        const fetchShoppingLists = async () => {
            try {
                const response = await fetch(`/api/get-shoppinglist?email=${email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch shopping lists');
                }
                const data = await response.json();
                setShoppingLists(data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchShoppingLists();
    }, [email]);

    const handleItemClick = (shoppingListId) => {
        router.push({
            pathname: '/manageShoppingList',
            query: { shoppingListId }
        });
    };

    if (isLoading) return <Loading />;

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <>
        <Header />
            <div className="container">
                <div className="row">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Shopping Lists</h4>
                            <Link href="/addShoppingList" className="btn w-50 m-2 mb-6 text-white bg-success">
                                Add List
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'auto' }}>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Items</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shoppingLists.length > 0 ? (
                                            shoppingLists.map((list) => (
                                                <tr key={list.shoppingListId} onClick={() => handleItemClick(list.shoppingListId)} style={{ cursor: 'pointer' }}>

                                                    <td>{list.description}</td>
                                                    <td>{list.shoppingItems.length}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="text-center custom-td">No shopping lists available.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShoppingList;
