import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import serverURL from '../SessionManager';
import Loading from './loading';
import Cookies from 'js-cookie';

const InventoryItems = () => {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    const [userEmail, setEmail] = useState('');

    useEffect(() => {
        // Set email from cookies or SessionMaster
        const userEmail = Cookies.get('userEmail') || serverURL.get('userEmail');
        if (userEmail) {
            setEmail(userEmail);
        } else {
            router.push('/login')
            setError('No email provided.');
            setIsLoading(false);
        }
    }, [router]);

    useEffect(() => {
        // Fetch inventory data if email is set
        const fetchInventory = async () => {
            if (!userEmail) return;
            
            try {
                const response = await fetch(`/api/get-inventory?email=${userEmail}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory');
                }
                const data = await response.json();
                setItems(data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchInventory();
    }, [userEmail]);


    const handleItemClick = (itemId) => {
        router.push({
            pathname: '/viewItem',
            query: { userEmail, itemId }
        });
    };

    const filteredItems = items.filter(item => {
        const quantity = parseFloat(item.quantity);
        const notifyBefore = parseFloat(item.notifyBefore);
        return item.crucial === true && quantity <= notifyBefore;
    });

    if (isLoading) return (<>
       
       
       <Loading />
       
       
       </>);
    if (error) return (
        <>Please try again later
        </>
    );


    return (
        <>
        <div className="row">

				<div className="card">
					<div className="card-header">
                        
						<h4 className="card-title">Low Stock</h4>
                   
					</div>
                    
                         <div className="card-body">
						<div className="table-responsive " style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'auto' }}>
							<table className="table table-hover ">
								<thead>
									<tr>
										<th>Name</th>
										<th>Quantity</th>
                                        <th>Expiring</th>
									</tr>
								</thead>
								<tbody>
                                {filteredItems.length > 0 ? (
                                            filteredItems.map((item) => (
                                                <tr key={item.itemId} onClick={() => handleItemClick(item.itemId)} style={{ cursor: 'pointer' }}>
                                                    <td>{item.name}</td>
                                                    <td><span className="badge badge-primary light">{item.quantity}</span></td>
                                                    <td className="color-primary">{item.expiryDate}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center custom-td">Please try again later.</td>
                                            </tr>
                                        )}
								</tbody>
							</table>
						</div>
					</div>

                    </div></div>
</>
    ) 
};

export default InventoryItems;
