
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TitleBar from '../components/Headers/header_profile';
import Cookies from 'js-cookie';
import Footer from '../components/footer';
import SessionMaster from '../SessionManager';
import Loading from '../components/loading';
import axios from 'axios';
import Image from 'next/image';
import { userAgent } from 'next/server';
import Recipe from './recipe';

const Dashboard = () => {
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(true);
  const [formChanged, setFormChanged] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [consumptionQuantity, setConsumptionQuantity] = useState(0);
  const router = useRouter();
  const [formData, setFormData] = useState({
    itemId: '',
    picture: '',
    name: '',
    expiryDate: '',
    quantity: '',
    calories: '',
    crucial: false,
    notifyBefore: 0.0
  });

  useEffect(() => {
    // Set email from cookies or SessionMaster
    const userEmail = Cookies.get('userEmail')
    if (!userEmail) {
       
        router.push('/login')

    }
}, [router]);

  useEffect(() => {
    const userEmail = Cookies.get('userEmail')
    const itemId = router.query.itemId;

    const fetchItemData = async () => {
      try {
        const response = await fetch(`/api/get-item?email=${userEmail}&itemId=${itemId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch item data');
        }
        const data = await response.json();
        setFormData({
          itemId: data.itemId,
          picture: data.picture,
          name: data.name,
          expiryDate: new Date(data.expiryDate).toISOString().split('T')[0],
          quantity: data.quantity,
          calories: data.calories,
          crucial: data.crucial,
          notifyBefore: data.notifyBefore
        });
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchItemData();
  }, [router]);

  useEffect(() => {
    if (!formData.name) return;


    const fetchRecipe = async (ingredient) => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe data');
        }
        const data = await response.json();
        setRecipes(data.meals);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe(formData.name);
  }, [formData.name]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = Cookies.get('userEmail');
      const response = await axios.post(`/api/update-item?email=${encodeURIComponent(email)}`, formData);
      if (response.status === 200) {
        setNotification('success');
        setFormChanged(false);
      } else {
        setNotification('error');
      }
    } catch (error) {
      setNotification('error');
    }
    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  const handleAddConsumption = () => {
    setShowModal(true);
  };

  const handleConsumptionSubmit = async () => {
    const profileId = Cookies.get('profileId');
    try {
      const response = await axios.post(`/api/add-consumption`, {
        profileId,
        itemId: formData.itemId,
        quantity: consumptionQuantity
      });
      if (response.status === 200) {
        setNotification('consumptionSuccess');
        router.reload();
        setShowModal(false);
      } else {
        setNotification('consumptionError');
      }
    } catch (error) {
      setNotification('consumptionError');
    }
    setTimeout(() => {
      setNotification('');
    //   router.reload();
    }, 2000);
  };

  if (loading) {
    return <div><Loading/></div>;
  }

  return (
    <>
      <TitleBar title={formData.name} />

      
        {notification === 'success' && (
          <div className="alert alert-success solid alert-dismissible fade show">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            <strong>Updated Successfully!</strong>
          </div>
        )}
        {notification === 'error' && (
          <div className="alert alert-danger solid alert-dismissible fade show">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <strong>Please try again!</strong>
          </div>
        )}
        {notification === 'consumptionSuccess' && (
          <div className="alert alert-success solid alert-dismissible fade show">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            <strong>Consumption added successfully!</strong>
          </div>
        )}
        {notification === 'consumptionError' && (
          <div className="alert alert-danger solid alert-dismissible fade show">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <strong>Failed to add consumption!</strong>
          </div>
        )}


        <div className="d-flex overflow-auto">
        
        <h4 className="invoice-num mb-0">{Recipe}</h4>
          {recipes.map((item, index) => (
            <div
              key={index}
              className="card counter invoice-card mx-2"
              style={{ minWidth: "250px" }}
              onClick={() => router.push(`/recipe?id=${item.idMeal}`)}
            >


              <div className="card-body d-flex align-items-center">
              
                <div className="card-box-icon">
                  <Image src={item.strMealThumb} width="50" height="50" alt="icon" />
                </div>
                <div className="chart-num">
                  <h4 className="invoice-num mb-0">{item.strMeal}</h4>
                  <p className="fs-18 mb-0">
    
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='card'>
          <div className='card-header'>
            <h4 className='card-title'>Update Item</h4>
            <button onClick={handleAddConsumption} className="btn w-45 text-white bg-danger fs-18 mt-3">Report Consumption</button>
          </div>
          <div className='card-body'>
            <div className='basic-form'>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='name' className='form-label'>Name : {formData.name}</label>
                  <input
                    type='text'
                    className='form-control input-default'
                    placeholder='Name'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled
                    hidden
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='expiryDate' className='form-label'>Expiry Date : {formData.expiryDate}</label>
                  <input
                    type='date'
                    className='form-control input-default'
                    placeholder='Expiry Date'
                    id='expiryDate'
                    name='expiryDate'
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    disabled
                    hidden
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='calories' className='form-label'>Calories: {formData.calories}</label>
                  <input
                    type='number'
                    className='form-control input-default'
                    placeholder='Calories'
                    id='calories'
                    name='calories'
                    value={formData.calories}
                    onChange={handleInputChange}
                    hidden
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='quantity' className='form-label'>Quantity</label>
                  <input
                    type='number'
                    className='form-control input-default'
                    placeholder='Quantity'
                    id='quantity'
                    name='quantity'
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='crucial' className='form-label'>Crucial</label>
                  <input
                    type='checkbox'
                    id='crucial'
                    name='crucial'
                    checked={formData.crucial}
                    onChange={(e) => setFormData({ ...formData, crucial: e.target.checked })}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='notifyBefore' className='form-label'>Notify Before (days)</label>
                  <input
                    type='number'
                    className='form-control input-default'
                    placeholder='Notify Before'
                    id='notifyBefore'
                    name='notifyBefore'
                    value={formData.notifyBefore}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {formChanged && (
                  <input
                    type='submit'
                    className='btn w-100 text-white bg-success fs-18'
                    value='Update Item'
                  />
                )}
              </form>
            </div>
            
          </div>
        </div>


      {/* Consumption Modal */}
      {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Report Consumption</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <label htmlFor="consumptionQuantity" className="form-label">Quantity</label>
                <input
                  type="range"
                  id="consumptionQuantity"
                  name="consumptionQuantity"
                  min="1"
                  max={formData.quantity}
                  value={consumptionQuantity}
                  onChange={(e) => setConsumptionQuantity(e.target.value)}
                  className="form-range"
                />
                <p>Quantity: {consumptionQuantity}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleConsumptionSubmit}>Add Report</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Dashboard;
