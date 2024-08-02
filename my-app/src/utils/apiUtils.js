import { API_LINKS } from '../apiConfig';

export const fetchRecipesForLetter = async (letter) => {
    const response = await fetch(`${API_LINKS.fetchAll}${letter}`);
    const data = await response.json();
    return data.meals || [];
};

export const fetchAllRecipesData = async () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const fetchPromises = letters.map(letter => fetchRecipesForLetter(letter));
    const allData = await Promise.all(fetchPromises);
    return allData.flat();
};