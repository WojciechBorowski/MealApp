import { useState } from 'react';

export const useFavorites = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
            return JSON.parse(localStorage.getItem('recipes')) || [];
      
    });

    const addToFavorites = (recipe) => {
        setFavoriteRecipes(prevFavorites => {
            if (prevFavorites.some(r => r.idMeal === recipe.idMeal)) {
                return prevFavorites;
            }
            const updatedFavorites = [...prevFavorites, recipe];
            localStorage.setItem('recipes', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    const removeFromFavorites = (recipeId) => {
        setFavoriteRecipes(prevFavorites => {
            const updatedFavorites = prevFavorites.filter(recipe => recipe.idMeal !== recipeId);
            localStorage.setItem('recipes', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    return {
        favoriteRecipes,
        addToFavorites,
        removeFromFavorites
    };
};
