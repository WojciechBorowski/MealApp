import React from 'react';
import './../App.css';

const RecipeList = ({ title, recipes, favoriteRecipes, onAddToFavorites, onRemoveFromFavorites, showOneLess = false }) => {
    
    const displayedRecipes = showOneLess ? recipes.slice(0, recipes.length - 1) : recipes;

    return (
        <div className="recipe-list">
            <h2>{title}</h2>
            {displayedRecipes.length === 0 ? (
                <p className='text-center'>Brak przepisów do wyświetlenia.</p>
            ) : (
                displayedRecipes.map(recipe => {
                    const isFavorite = favoriteRecipes.some(fav => fav.idMeal === recipe.idMeal);

                    return (
                        <div key={recipe.idMeal} className="recipe-card">
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                            <div className="recipe-card-body">
                                <h5>{recipe.strMeal}</h5>
                                <p>{recipe.strCategory}</p>
                                <ul>
                                    {recipe.strIngredient1 && <li>{recipe.strIngredient1}</li>}
                                    {recipe.strIngredient2 && <li>{recipe.strIngredient2}</li>}
                                    {recipe.strIngredient3 && <li>{recipe.strIngredient3}</li>}
                                    {recipe.strIngredient4 && <li>{recipe.strIngredient4}</li>}
                                    {recipe.strIngredient5 && <li>{recipe.strIngredient5}</li>}
                                </ul>
                                {recipe.strSource ? (
                                    <a href={recipe.strSource} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Pełny przepis</a>
                                ) : (
                                    <p className="text-danger">Link do przepisu jest niedostępny</p>
                                )}
                                <button
                                    onClick={() => isFavorite ? onRemoveFromFavorites(recipe.idMeal) : onAddToFavorites(recipe)}
                                    className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-warning'}`}
                                >
                                    {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default RecipeList;
