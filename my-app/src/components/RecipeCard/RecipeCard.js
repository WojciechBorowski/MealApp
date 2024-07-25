import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, favoriteRecipes, addToFavorites, removeFromFavorites }) => {

    // pomyśleć o alternatywie dotyczącej składników - napewno jest lepszy sposób
    const {
        idMeal,
        strMeal,
        strCategory,
        strMealThumb,
        strSource,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5
    } = recipe;

    const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5].filter(Boolean);

    const handleAddToFavorites = () => {
        if (addToFavorites) {
            addToFavorites(recipe);
        }
    };

    const handleRemoveFromFavorites = () => {
        if (removeFromFavorites) {
            removeFromFavorites(idMeal);
        }
    };

    const isFavorite = favoriteRecipes.some(fav => fav.idMeal === idMeal);

    const handleKeyDown = (event, action) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            action();
        }
    };
    // dodać funkcje, odpowiedzialne za składniki, 
    return (
        <div className="recipe-card">
            <img src={strMealThumb} alt={strMeal} className="img-fluid recipe-image" />
            <div className="recipe-card-body">
                <h5 className="recipe-title">{strMeal}</h5>
                <p className="recipe-category">{strCategory}</p>
                <p className="recipe-ingredients-title">Składniki:</p>
                <ul className="recipe-ingredients-list">
                    {ingredients.map((ingredient, index) => (
                        <li key={`${ingredient}-${index}`}>{ingredient}</li>
                    ))}
                </ul>
                <div className="btn-container">
                    {strSource ? (
                        <a href={strSource} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                            Pełny przepis
                        </a>
                    ) : (
                        <div className="btn text-danger">
                            Link nie jest dostępny
                        </div>
                    )}
                    <button
                        onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
                        onKeyDown={(event) => handleKeyDown(event, isFavorite ? handleRemoveFromFavorites : handleAddToFavorites)}
                        className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-warning'}`}
                        aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                        tabIndex={0}
                    >
                        {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
