import { useState, useEffect } from 'react';

import { fetchAllRecipesData } from '../utils/apiUtils';
import { processRecipesData } from '../utils/recipeUtils';

export const useRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [allRecipes, setAllRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllRecipes = async () => {

            setLoading(true);

            const allRecipesData = await fetchAllRecipesData();
            setAllRecipes(allRecipesData);
            processRecipesData(allRecipesData, setRecipes, setCategories);

            setLoading(false);

        };

        fetchAllRecipes();
    }, []);

    return {
        recipes,
        allRecipes,
        categories,
        loading,
        setRecipes,
        setCategories
    };
};