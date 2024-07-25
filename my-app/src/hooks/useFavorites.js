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
    };

    return {
        favoriteRecipes,
        loadFavoriteRecipes,
        addToFavorites,
        removeFromFavorites,
    };
};

export default useFavorites;
