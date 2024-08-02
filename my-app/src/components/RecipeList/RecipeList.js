import React from 'react';

import RecipeCard from '../RecipeCard/RecipeCard';

import './RecipeList.css';

const RecipeList = ({ recipes, favoriteRecipes, onAddToFavorites, onRemoveFromFavorites }) => {
    return (
        <div className="recipe-list">
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
        </div>
    );
};

export default RecipeList;
