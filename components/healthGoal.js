import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import serverURL from '../SessionManager';
import Loading from '../components/loading';
import Footer from '../components/footer';
import Header from '../components/header';

const TitleBar = (title) => {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [totalCalories, setTotalCalories] = useState(0);
    const router = useRouter();

    const profile = serverURL.get('profileId');

    useEffect(() => {
        // Function to fetch inventory data
        const fetchInventory = async () => {
            if (!profile) {
                setError('No profile provided.');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/get-consumption?profile=` + profile);
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory');
                }
                const data = await response.json();

                setItems(data);

                // Calculate total calories
                const totalCalories = data.reduce((acc, item) => acc + item.item_calories, 0);
                setTotalCalories(totalCalories);

                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchInventory();
    }, [profile]);

return(   // Function to handle back navigation
<>

{console.log(totalCalories)}
{/* {console.log(users)} */}
<div className="col-xl-3 col-xxl-6 col-lg-6 col-sm-6">
				<div className="widget-stat card bg-secondary ">
					<div className="card-body p-4">
						<div className="media">
							<span className="me-3">
								<i className="la la-user"></i>
							</span>
							<div className="media-body text-white">
								<p className="mb-1 text-white">Health Goal</p>
								<h3 className="text-white">{totalCalories}</h3>
								<div className="progress mb-2 bg-secondary">
									<div className="progress-bar progress-animated bg-white" style={{width: '30%'}}></div>
								</div>
								<small>Keep going you can do it !</small>
							</div>
						</div>
					</div>
				</div>
			</div>
        </>
    );
};

export default TitleBar;
