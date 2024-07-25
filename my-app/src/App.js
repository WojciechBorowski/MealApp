import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useRecipesManager from './hooks/useRecipesManager';
import RecipeList from './components/RecipeList/RecipeList';
import Navbar from './components/Navbar/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import './App.css';

function App() {
    const { recipes, favoriteRecipes, categories, searchRecipes, getRecipesByCategory, addToFavorites, removeFromFavorites } = useRecipesManager();

    return (
        <Router>
            <div className="App">
                <Navbar categories={categories} onCategorySelect={getRecipesByCategory} onSearch={searchRecipes} />
                <div className="container">
                    {/* Jeśli używasz komponentu Loader, musisz zarządzać jego stanem w inny sposób */}
                    {/* Przykład usunięcia odniesień do status */}
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
