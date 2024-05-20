import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../components/loading';
import Image from 'next/image';
import TitleBar from '../components/Headers/header_profile';
import Footer from '../components/footer';

const Recipe = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe data');
        }
        const data = await response.json();
        setRecipe(data.meals[0]);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="container">
    <TitleBar title="Recipe" />
      <h1>{recipe.strMeal}</h1>
      <Image src={recipe.strMealThumb} width={500} height={500} alt={recipe.strMeal} />
      <p>{recipe.strInstructions}</p>
      <h3>Ingredients:</h3>
      <ul>
        {Array.from({ length: 20 }).map((_, index) => {
          const ingredient = recipe[`strIngredient${index + 1}`];
          const measure = recipe[`strMeasure${index + 1}`];
          return ingredient ? (
            <li key={index}>
              {ingredient} - {measure}
            </li>
          ) : null;
        })}
      </ul>
      <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">Source</a>
      <Footer/>
    </div>
  );
};

export default Recipe;
