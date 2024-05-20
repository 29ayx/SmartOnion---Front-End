import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TitleBar from '../components/Headers/header_profile';
import Footer from '../components/footer';
import Loading from '../components/loading';
import Image from 'next/image';

const Dashboard = () => {

  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedPreference, setSelectedPreference] = useState('');
  const router = useRouter();

  
  useEffect(() => {
      setSelectedPreference('American');
    // Fetch preferences
    const fetchPreferences = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        if (!response.ok) {
          throw new Error('Failed to fetch preferences');
        }
        const data = await response.json();
        setPreferences(data.meals);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  useEffect(() => {
    if (!selectedPreference) return;

    // Fetch recipes based on selected preference
    const fetchRecipes = async (preference) => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${preference}`);
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

    fetchRecipes(selectedPreference);
  }, [selectedPreference]);

  const handlePreferenceClick = (preference) => {
    setSelectedPreference(preference);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <TitleBar title="Try something new" />

        <div className="preferences-slider d-flex overflow-auto mb-3">
          {preferences.map((preference, index) => (
            <div
              key={index}
              className={`badge badge-secondary mx-1 ${selectedPreference === preference.strArea ? 'badge-primary' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => handlePreferenceClick(preference.strArea)}
            >
              {preference.strArea}
            </div>
          ))}
        </div>
        <div className="recipes-list d-flex flex-wrap justify-content-start">
          {recipes.map((item, index) => (
            <div
              key={index}
              className="card counter invoice-card mx-2 mb-3"
              style={{ minWidth: '540px' }}
              onClick={() => router.push(`/recipe?id=${item.idMeal}`)}
            >
              <div className="card-body  d-flex align-items-center">
                <div className="card-box-icon ">
                  <Image src={item.strMealThumb} width="50" height="50" alt="icon" />
                </div>
                <div className="chart-num">
                  <h4 className="invoice-num mb-0">{item.strMeal}</h4>
                </div>
              </div>
            </div>
          ))}

      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
