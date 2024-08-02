import React from 'react';

import RecipeCard from '../RecipeCard/RecipeCard';

import './RecipeList.css';

const RecipeList = ({ recipes, favoriteRecipes, onAddToFavorites, onRemoveFromFavorites }) => {

    //pozbyć się logiki biznesowej 
    if (recipes.length === 0) {
        return <div className="alert alert-info">Brak przepisów do wyświetlenia.</div>;
    }
    
    return (
        <div className="recipe-list">
<<<<<<< HEAD
            {recipes.length === 0 ? (
                <p>Brak przepisów do wyświetlenia.</p>
            ) : (
                recipes.map(recipe => (
                    <RecipeCard
                        key={recipe.idMeal}
                        recipe={recipe}
                        favoriteRecipes={favoriteRecipes}
                        addToFavorites={onAddToFavorites}
                        removeFromFavorites={onRemoveFromFavorites}
                    />
                ))
            )}
=======
            {recipes.map(recipe => (
                <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    favoriteRecipes={favoriteRecipes}
                    addToFavorites={onAddToFavorites}
                    removeFromFavorites={onRemoveFromFavorites}
                />
            ))}
>>>>>>> bf92175cf8f1e45b0fe5b1c05af0cb727c4f47f6
        </div>
    );
};

export default RecipeList;
