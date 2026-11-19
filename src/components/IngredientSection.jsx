import { useState } from 'react';

import '../styles/ingredientSectionStyles.css';
import { IngredientItem } from './IngredientItem';

export const IngredientSection = ({ setRecipeShown }) => {
    const [ingredients, setIngredients] = useState([]);

    function addIngredient(formData) {
        const ingredient = String(formData.get('ingredient') ?? '')
            .trim()
            .toLocaleLowerCase();

        if (!ingredient || ingredient.length === 0) return;

        setIngredients((current) =>
            current.includes(ingredient) ? current : [...current, ingredient]
        );
    }

    function handleOnDelete(ingredientToDelete) {
        setIngredients((current) => {
            const nextIngredients = current.filter(
                (ingredient) => ingredient !== ingredientToDelete
            );
            if (nextIngredients.length <= 3) setRecipeShown(false);
            return nextIngredients;
        });
    }

    function handleClearAll() {
        setIngredients([]);
        setRecipeShown(false);
    }

    function handleGetRecipe() {
        setRecipeShown(true);
    }

    return (
        <section>
            <p className="section-description">
                Your personal chef to generate recipes with ingredients you
                pick!
            </p>
            <form action={addIngredient}>
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    name="ingredient"
                />
                <button className="submit-btn" type="submit">
                    Add ingredient
                </button>
                {ingredients.length > 0 && (
                    <button
                        className="clear-btn"
                        type="button"
                        onClick={handleClearAll}
                    >
                        Clear all
                    </button>
                )}
            </form>
            {ingredients.length > 0 && (
                <div>
                    <h3>Ingredients on hand:</h3>
                    <ul className="ingredient-list">
                        {ingredients.map((ingredient, index) => (
                            <IngredientItem
                                key={index}
                                item={ingredient}
                                onDelete={() => handleOnDelete(ingredient)}
                            />
                        ))}
                    </ul>
                </div>
            )}
            {ingredients.length > 3 && (
                <div className="get-recipe-container">
                    <div className="get-recipe-description">
                        <h4>Ready for a recipe?</h4>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={handleGetRecipe}>Get a recipe</button>
                </div>
            )}
        </section>
    );
};
