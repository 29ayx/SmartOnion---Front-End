import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import serverURL from '../SessionManager';
import Loading from '../components/loading';

const InventoryItems = () => {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    const email = serverURL.get('userEmail');
    useEffect(() => {

        // Function to fetch inventory data
        const fetchInventory = async () => {
            if (!email) {
                setError('No email provided.');
                setIsLoading(false);
                return;
            }
            
            try {
                const response = await fetch(`/api/get-inventory?email=`+email);
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
    }, [email]);  // Dependency array includes email to refetch when it changes

    const handleItemClick = (itemId) => {
        router.push({
            pathname: '/viewItem',
            query: { email, itemId }
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
        <div class="row">

				<div class="card">
					<div class="card-header">
                        
						<h4 class="card-title">Inventory</h4>
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
                                {items.length > 0 ? (
                            items.map((item) => (

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
				<div class="card">
					<div class="card-header">
                        
						<h4 class="card-title">Low Stock</h4>
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
