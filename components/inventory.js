import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import serverURL from '../SessionManager';
import Loading from '../components/loading';
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
    const inventoryItems = items.filter(item => {
        const quantity = parseFloat(item.quantity);
        return quantity >= 1;
    });
    

    if (isLoading) return (<>
       
       
       <Loading />
       
       
       </>);
    if (error) return (
        <>
            <div className="card">
                <div className="card-header d-block d-sm-flex border-0 flex-wrap transactions-tab justify-content-center">
                    <div className="me-3 mb-3">
                        <h4 className="card-title mb-2">Your Inventory In Empty</h4>
                    </div>
                </div>
                <div className="card-body tab-content p-0">
                    <div className="tab-pane active show fade" id="monthly" role="tabpanel">
                        <div className="table-responsive d-flex justify-content-center">
                            <Link href="/addItem" className="btn w-75 m-2 mb-6 text-white bg-success">
                                Add your first item
                            </Link>
                        </div>
                    </div>
                    {/* Add content for Weekly and Today tabs here */}
                </div>
            </div>
        </>
    );


    return (
        <>
        <div className="row">

				<div className="card">
					<div className="card-header">
                        
						<h4 className="card-title">Inventory</h4>
                        <Link href="/addItem" className="btn w-50 m-2 mb-6 text-white bg-success">
                    Add Item
                            </Link>
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
                                {inventoryItems.length > 0 ? (
                            inventoryItems.map((item) => (

                                <tr key={item.key} onClick={() => handleItemClick(item.itemId)} style={{ cursor: 'pointer' }}>

										<td>{item.name}</td>
										<td className="color-primary">{item.quantity}</td>
										<td><span className="badge badge-primary light">{item.expiryDate}</span></td>
									</tr>
                                    
                                  ))
                                ) : (
                                    <tr >
                                        <td colSpan="4" className="text-center custom-td">No items available.</td>
                                    </tr>
                                )}
								</tbody>
							</table>
						</div>
					</div>
                    </div>
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
                                                    <td><span className="badge badge-danger light">{item.quantity}</span></td>
                                                    <td className="color-primary">{item.expiryDate}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center custom-td">No items available.</td>
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
