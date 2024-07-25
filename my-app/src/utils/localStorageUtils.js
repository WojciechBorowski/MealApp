export const updateRecipesInLocalStorage = (updatedRecipes) => {
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
};

export const getFavoriteRecipesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('recipes')) || [];
};