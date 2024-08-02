export const processRecipesData = (allRecipes, setRecipes, setCategories) => {
    setRecipes(getRandomRecipes(allRecipes));
    setCategories(getCategoriesFromRecipes(allRecipes));
};

export const getRandomRecipes = (recipes, count = recipes.count) => {
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const getCategoriesFromRecipes = (recipes) => {
    const uniqueCategories = new Set(recipes.map(recipe => recipe.strCategory).filter(Boolean));
    return Array.from(uniqueCategories);
};
