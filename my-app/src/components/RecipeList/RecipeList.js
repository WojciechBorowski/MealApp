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
            {recipes.map(recipe => (
                <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    favoriteRecipes={favoriteRecipes}
                    addToFavorites={onAddToFavorites}
                    removeFromFavorites={onRemoveFromFavorites}
                />
            ))}
        </div>
    );
};

export default RecipeList;
