import { API_LINKS } from '../apiConfig/apiConfig';

export const fetchAndProcessRecipes = async () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const fetchPromises = [...alphabet].map(async letter => {
        try {
            const response = await fetch(`${API_LINKS.fetchAll}${letter}`);
            if (!response.ok) {
                throw new Error(`Błąd podczas pobierania przepisów dla litery ${letter}`);
            }
            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error(`Błąd podczas pobierania przepisów dla litery ${letter}`, error);
            return [];
        }
    });

    const allRecipes = (await Promise.all(fetchPromises)).flat();
    return allRecipes;
};



export const getRandomRecipes = (recipes, count = 24) => {
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const getCategoriesFromRecipes = (recipes) => {
    const uniqueCategories = new Set();

    recipes.forEach(recipe => {
        if (recipe.strCategory) {
            uniqueCategories.add(recipe.strCategory);
        }
    });

    return Array.from((uniqueCategories));
};