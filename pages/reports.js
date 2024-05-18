import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import serverURL from '../SessionManager';
import Loading from '../components/loading';
import Footer from '../components/footer';
import Header from '../components/header';

const InventoryItems = () => {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    const profile = serverURL.get('profileId');
    useEffect(() => {

        // Function to fetch inventory data
        const fetchInventory = async () => {
            if (!profile) {
                setError('No email provided.');
                setIsLoading(false);
                return;
            }
            
            try {
                const response = await fetch(`/api/get-consumption?profile=`+profile);
                // console.log(profile);
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
    }, [profile]);  // Dependency array includes email to refetch when it changes

    if (isLoading) return (<>
       
       
       <Loading />
       
       
       </>);
    if (error) return (
        <>    <Header/>
        <div className='container-fluid'>
            <div className="card">
                <div className="card-header d-block d-sm-flex border-0 flex-wrap transactions-tab justify-content-center">
                    <div className="me-3 mb-3">
                        <h4 className="card-title mb-2">No record founds !</h4>
                    </div>
                </div>
                <div className="card-body tab-content p-0">
                    <div className="tab-pane active show fade" id="monthly" role="tabpanel">
                        <div className="table-responsive p-5 d-flex justify-content-center">
                           <h5>Continue using the application, it it will generate reports automatically</h5>
                        </div>
                    </div>
                    {/* Add content for Weekly and Today tabs here */}
                </div>
            </div>
            <Footer/>
            </div>
        </>
    );


    return (
        <>
        <Header/>
        <div className='container-fluid'>
        <div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header">
                        
						<h4 class="card-title">Your Consumption</h4>
                        <Link href="/add-consumption" className="btn w-50 m-2 mb-6 text-white bg-success">
Add Record
                            </Link>
					</div>
                    
        <div className="card-body">
						<div className="table-responsive " style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'auto' }}>
							<table className="table table-hover ">
								<thead>
									<tr>
										<th>Name</th>
                                        <th>Quantity</th>
                                        <th>Calories</th>
									</tr>
								</thead>
								<tbody>

                                {items.length > 0 ? (
                            items.map((item) => (

                                <tr key={item.key} style={{ cursor: 'pointer' }}>
                                    {console.log(item)}

										<td>{item.itemName}</td>
										<td><span className="badge badge-primary light">{item.item_quantity}</span></td>
										<td className="color-primary">{item.item_calories}</td>
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
                    </div></div>
                    </div>
                    <Footer/>
</>
    ) 
};

export default InventoryItems;
