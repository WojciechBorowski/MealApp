import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD

import RecipeList from './components/RecipeList/RecipeList';
import Navbar from './components/navbar/Navbar';
import Loader from './components/Loader/Loader';

import { useRecipes } from './hooks/useRecipes';
import { useFavorites } from './hooks/useFavorites';

import { searchRecipes, getRecipesByCategory } from './utils/searchUtils';
import { getRandomRecipes } from './utils/recipeUtils'; 

import './App.css';

function App() {
    const { recipes, allRecipes, categories, loading, error, setRecipes, setCategories } = useRecipes();
    const { favoriteRecipes, addToFavorites, removeFromFavorites } = useFavorites();

    const handleSearchRecipes = (query = '') => {
        searchRecipes(query, allRecipes, setRecipes, setCategories, categories);
    };

    const handleGetRecipesByCategory = (category) => {
        getRecipesByCategory(category, allRecipes, setRecipes, setCategories, categories);
    };

    const handleMealAppClick = () => {
        const randomRecipes = getRandomRecipes(allRecipes, recipes.length);  
        setRecipes(randomRecipes);
        setCategories(categories);  
    };
=======
import useRecipesManager from './hooks/useRecipesManager';
import RecipeList from './components/RecipeList/RecipeList';
import Navbar from './components/Navbar/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import './App.css';

function App() {
    const { recipes, favoriteRecipes, categories, searchRecipes, getRecipesByCategory, addToFavorites, removeFromFavorites } = useRecipesManager();
>>>>>>> bf92175cf8f1e45b0fe5b1c05af0cb727c4f47f6

    return (
        <Router>
            <div className="App">
                <Navbar categories={categories} onCategorySelect={handleGetRecipesByCategory} onSearch={handleSearchRecipes} onMealAppClick={handleMealAppClick} />
                <div className="container">
<<<<<<< HEAD
                    {loading && <Loader />}
                    {!loading && !error && !categories.length && <div className="alert alert-info"></div>}
                    {error && !loading && !categories.length && <div className="alert alert-danger">{error}</div>}
=======
                    {/* Jeśli używasz komponentu Loader, musisz zarządzać jego stanem w inny sposób */}
                    {/* Przykład usunięcia odniesień do status */}
>>>>>>> bf92175cf8f1e45b0fe5b1c05af0cb727c4f47f6
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
                                element={<RecipeList recipes={recipes} favoriteRecipes={favoriteRecipes} onAddToFavorites={addToFavorites} onRemoveFromFavorites={removeFromFavorites} />}
                            />
                        ))}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
