import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import Navbar from './components/navbar/Navbar';
import './App.css';

function App() {
    const [recipes, setRecipes] = useState([]);
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchRecipes();
        loadFavoriteRecipes();
        fetchCategories();
    }, []);

    const fetchRecipes = async (query = '') => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            setRecipes(data.meals || []);
        } catch (error) {
            console.error("Error fetching recipes", error);
        }
    };

    const loadFavoriteRecipes = () => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        setFavoriteRecipes(storedRecipes);
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
            const data = await response.json();
            const categories = data.categories.map(category => category.strCategory);
            setCategories(categories);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    const handleCategorySelect = async (category) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await response.json();

            const meals = data.meals || [];
            const detailedMeals = await Promise.all(meals.map(async meal => {
                const detailedResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                const detailedData = await detailedResponse.json();
                return detailedData.meals[0];
            }));

            setRecipes(detailedMeals);
        } catch (error) {
            console.error("Error fetching recipes for category", error);
        }
    };

    const addToFavorites = (recipe) => {
        const existingRecipe = favoriteRecipes.find(r => r.idMeal === recipe.idMeal);
        if (existingRecipe) {
            alert('Recipe already in favorites.');
            return;
        }

        const newFavoriteRecipes = [...favoriteRecipes, recipe];
        localStorage.setItem('recipes', JSON.stringify(newFavoriteRecipes));
        setFavoriteRecipes(newFavoriteRecipes);
        alert('Recipe added to favorites!');
    };

    const removeFromFavorites = (recipeId) => {
        const updatedFavoriteRecipes = favoriteRecipes.filter(recipe => recipe.idMeal !== recipeId);
        localStorage.setItem('recipes', JSON.stringify(updatedFavoriteRecipes));
        setFavoriteRecipes(updatedFavoriteRecipes);
        alert('Recipe removed from favorites!');
    };

    return (
        <Router>
            <div className="App">
                <Navbar categories={categories} onCategorySelect={handleCategorySelect} onSearch={fetchRecipes} />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<RecipeList recipes={recipes} favoriteRecipes={favoriteRecipes} onAddToFavorites={addToFavorites} onRemoveFromFavorites={removeFromFavorites} showOneLess />} />
                        <Route path="/favorites" element={<RecipeList recipes={favoriteRecipes} favoriteRecipes={favoriteRecipes} onRemoveFromFavorites={removeFromFavorites} />} />
                        {categories.map(category => (
                            <Route key={category} path={`/${category}`} element={<RecipeList recipes={recipes} favoriteRecipes={favoriteRecipes} onAddToFavorites={addToFavorites} />} />
                        ))}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
