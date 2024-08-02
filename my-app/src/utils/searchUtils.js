export const searchRecipes = (query, allRecipes, setRecipes, setCategories, categories) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredRecipes = allRecipes.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(lowerCaseQuery) ||
        (recipe.strIngredients && recipe.strIngredients.toLowerCase().includes(lowerCaseQuery))
    );
    setRecipes(filteredRecipes.length ? filteredRecipes : []);
    setCategories(filteredRecipes.length ? categories : []);
};

export const getRecipesByCategory = (category, allRecipes, setRecipes, setCategories, categories) => {
    const filteredRecipes = allRecipes.filter(recipe => recipe.strCategory === category);
    setRecipes(filteredRecipes.length ? filteredRecipes : []);
    setCategories(filteredRecipes.length ? categories : []);
};