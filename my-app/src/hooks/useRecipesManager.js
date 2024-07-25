import { useEffect } from 'react';
import useFetchRecipes from './useFetchRecipes';
import useFavorites from './useFavorites';

const useRecipesManager = () => {
    const { recipes, allRecipes, categories, setRecipes, setInitialData } = useFetchRecipes();
    const { favoriteRecipes, loadFavoriteRecipes, addToFavorites, removeFromFavorites } = useFavorites();

    useEffect(() => {
        const fetchData = async () => {
            await setInitialData();
            loadFavoriteRecipes();
        };
        fetchData();
    }, [setInitialData, loadFavoriteRecipes]);

    const searchRecipes = (query = '') => {
        const lowerCaseQuery = query ? query.toLowerCase() : '';

        const filteredRecipes = allRecipes.filter(recipe => {
            const mealMatch = recipe.strMeal ? recipe.strMeal.toLowerCase().includes(lowerCaseQuery) : false;
            const ingredientsMatch = recipe.strIngredients ? recipe.strIngredients.toLowerCase().includes(lowerCaseQuery) : false;

            return mealMatch || ingredientsMatch;
        });

        setRecipes(filteredRecipes);
    };

    const getRecipesByCategory = (category) => {
        const filteredRecipes = allRecipes.filter(recipe => recipe.strCategory === category);
        setRecipes(filteredRecipes);
    };

    return {
        recipes,
        allRecipes,
        favoriteRecipes,
        categories,
        searchRecipes,
        getRecipesByCategory,
        addToFavorites,
        removeFromFavorites,
    };
};

export default useRecipesManager;
