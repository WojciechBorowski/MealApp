import { useState, useCallback } from 'react';

import { fetchAndProcessRecipes, getCategoriesFromRecipes, getRandomRecipes } from '../utils/utils';

const useFetchRecipes = () => {
    const [allRecipes, setAllRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);

    const setInitialData = useCallback(async () => {

        const fetchedRecipes = await fetchAndProcessRecipes();

        setAllRecipes(fetchedRecipes);
        setRecipes(getRandomRecipes(fetchedRecipes));
        setCategories(getCategoriesFromRecipes(fetchedRecipes));


    }, []);

    return {
        recipes,
        allRecipes,
        categories,
        setRecipes,
        setInitialData,
    };
};

export default useFetchRecipes;
