import React, { useState, useEffect } from 'react';
import { API_LINKS } from './apiConfig';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList/RecipeList';
import Navbar from './components/navbar/Navbar';
import Loader from './components/Loader/Loader'; 
import './App.css';


const processResponses = (responses) => {
    return responses.flatMap(response => response.meals || []);
};

const setRecipeData = (recipes, setAllRecipes, setRecipes, setCategories) => {
    setAllRecipes(recipes);
    setRecipes(getRandomRecipes(recipes)); 
    setCategories(getCategoriesFromRecipes(recipes)); 
};

const fetchAllRecipes = async (setAllRecipes, setRecipes, setCategories, setError, setLoading) => {
    setLoading(true); 
    try {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'; 
        const fetchPromises = [...alphabet].map(letter => 
            fetch(`${API_LINKS.fetchAll}${letter}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Błąd podczas pobierania przepisów dla litery ${letter}`);
                    }
                    return response.json();
                })
        );

        const allData = await Promise.all(fetchPromises);
        const allRecipes = processResponses(allData);

        setRecipeData(allRecipes, setAllRecipes, setRecipes, setCategories);
        setError('');
    } catch (error) {
        console.error("Błąd podczas pobierania wszystkich przepisów", error);
        setError('Wystąpił problem podczas ładowania przepisów. Spróbuj ponownie później.');
    } finally {
        setLoading(false); 
    }
};

const getRandomRecipes = (recipes, count = 21) => {
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const getCategoriesFromRecipes = (recipes) => {
    const uniqueCategories = new Set();
    recipes.forEach(recipe => {
        if (recipe.strCategory) {
            uniqueCategories.add(recipe.strCategory);
        }
    });
    return Array.from(uniqueCategories);
};

function App() {
    const [recipes, setRecipes] = useState([]);
    const [allRecipes, setAllRecipes] = useState([]); 
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); 
    const [isDataLoaded, setIsDataLoaded] = useState(false); 

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        await fetchAllRecipes(setAllRecipes, setRecipes, setCategories, setError, setLoading);
        loadFavoriteRecipes();
        setIsDataLoaded(true); 
    };

    const searchRecipes = (query = '') => {
        try {
            console.log('Wyszukiwanie dla:', query); 
            const lowerCaseQuery = query.toLowerCase();
            const filteredRecipes = allRecipes.filter(recipe =>
                recipe.strMeal.toLowerCase().includes(lowerCaseQuery) ||
                (recipe.strIngredients && recipe.strIngredients.toLowerCase().includes(lowerCaseQuery))
            );
            if (filteredRecipes.length === 0) {
                setError('Brak przepisów spełniających kryteria wyszukiwania.');
            } else {
                setRecipes(filteredRecipes); 
                setError('');
            }
        } catch (error) {
            console.error('Błąd podczas wyszukiwania przepisów', error);
            setError('Wystąpił problem podczas wyszukiwania przepisów. Spróbuj ponownie później.');
        }
    };

    const loadFavoriteRecipes = () => {
        try {
            const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
            setFavoriteRecipes(storedRecipes);
        } catch (error) {
            console.error('Błąd podczas ładowania ulubionych przepisów', error);
            setError('Wystąpił problem podczas ładowania ulubionych przepisów. Spróbuj ponownie później.');
        }
    };

    const getRecipesByCategory = (category) => {
        try {
            const filteredRecipes = allRecipes.filter(recipe => 
                recipe.strCategory === category
            );

            if (filteredRecipes.length === 0) {
                setError(`Brak przepisów w kategorii ${category}.`);
            } else {
                setRecipes(filteredRecipes);
                setError('');
            }
        } catch (error) {
            console.error(`Błąd podczas filtrowania przepisów dla kategorii ${category}`, error);
            setError(`Wystąpił problem podczas ładowania przepisów dla kategorii ${category}. Spróbuj ponownie później.`);
        }
    };

    const addToFavorites = (recipe) => {
        try {
            if (checkIfRecipeIsFavorite(recipe)) {
                setError('Przepis jest już w ulubionych.');
                return;
            }
            const existingRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
            const newFavoriteRecipes = [...existingRecipes, recipe];
            updateRecipesInLocalStorage(newFavoriteRecipes);
        } catch (error) {
            console.error('Błąd podczas dodawania przepisu do ulubionych', error);
            setError('Wystąpił problem podczas dodawania przepisu do ulubionych. Spróbuj ponownie później.');
        }
    };

    const removeFromFavorites = (recipeId) => {
        try {
            const existingRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
            const updatedFavoriteRecipes = existingRecipes.filter(recipe => recipe.idMeal !== recipeId);
            updateRecipesInLocalStorage(updatedFavoriteRecipes);
        } catch (error) {
            console.error('Błąd podczas usuwania przepisu z ulubionych', error);
            setError('Wystąpił problem podczas usuwania przepisu z ulubionych. Spróbuj ponownie później.');
        }
    };

    const updateRecipesInLocalStorage = (updatedRecipes) => {
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        setFavoriteRecipes(updatedRecipes);
    };

    const checkIfRecipeIsFavorite = (recipe) => {
        const existingRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        return existingRecipes.some(r => r.idMeal === recipe.idMeal);
    };

    return (
        <Router>
            <div className="App">
                <Navbar categories={categories} onCategorySelect={getRecipesByCategory} onSearch={searchRecipes} />
                <div className="container">
                    {loading && <Loader />} {}
                    {!loading && !isDataLoaded && <div className="alert alert-info">Ładowanie danych...</div>} {}
                    {error && !loading && !isDataLoaded && <div className="alert alert-danger">{error}</div>}
                    <Routes>
                        <Route
                            path="/"
                            element={<RecipeList recipes={recipes} favoriteRecipes={favoriteRecipes} onAddToFavorites={addToFavorites} onRemoveFromFavorites={removeFromFavorites} />}
                        />
                        <Route
                            path="/favorites"
                            element={<RecipeList recipes={favoriteRecipes} favoriteRecipes={favoriteRecipes} onRemoveFromFavorites={removeFromFavorites} />}
                        />
                        {categories.map(category => (
                            <Route
                                key={category}
                                path={`/${category}`}
                                element={<RecipeList recipes={recipes} favoriteRecipes={favoriteRecipes} onAddToFavorites={addToFavorites} />}
                            />
                        ))}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
