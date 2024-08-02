<<<<<<< HEAD
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
=======
import { useState, useCallback } from 'react';
import { updateRecipesInLocalStorage, getFavoriteRecipesFromLocalStorage  } from '../utils/localStorageUtils';

const useFavorites = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    const loadFavoriteRecipes = useCallback(() => {
        const storedRecipes = getFavoriteRecipesFromLocalStorage();
        setFavoriteRecipes(storedRecipes);
    }, []);

    const addToFavorites = (recipe) => {
        const existingRecipes = getFavoriteRecipesFromLocalStorage();
        const newFavoriteRecipes = [...existingRecipes, recipe];
        updateRecipesInLocalStorage(newFavoriteRecipes);
        setFavoriteRecipes(newFavoriteRecipes);
    };

    const removeFromFavorites = (recipeId) => {
            const existingRecipes = getFavoriteRecipesFromLocalStorage();
            const updatedFavoriteRecipes = existingRecipes.filter(recipe => recipe.idMeal !== recipeId);
            updateRecipesInLocalStorage(updatedFavoriteRecipes);
            setFavoriteRecipes(updatedFavoriteRecipes);
>>>>>>> bf92175cf8f1e45b0fe5b1c05af0cb727c4f47f6
    };

    return {
        favoriteRecipes,
<<<<<<< HEAD
        addToFavorites,
        removeFromFavorites
    };
};
=======
        loadFavoriteRecipes,
        addToFavorites,
        removeFromFavorites,
    };
};

export default useFavorites;
>>>>>>> bf92175cf8f1e45b0fe5b1c05af0cb727c4f47f6
