import { useState } from 'react';

import '../styles/mainStyles.css';
import { IngredientItem } from './IngredientItem';

export const IngredientSection = () => {
    const [ingredients, setIngredients] = useState([]);

    function addIngredient(formData) {
        const ingredient = String(formData.get('ingredient') ?? '').trim();

        if (!ingredient || ingredient.length === 0) return;

        setIngredients((current) =>
            current.includes(ingredient) ? current : [...current, ingredient]
        );
    }

    function handleOnDelete(ingredientToDelete) {
        setIngredients((current) =>
            current.filter((ingredient) => ingredient !== ingredientToDelete)
        );
    }

    function handleClearAll() {
        setIngredients([]);
    }

    return (
        <section>
            <p>
                Your personal chef to create recipes with ingredients you
                already have!
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
            {ingredients.length > 0 && <h3>Ingredients in hand</h3>}
            <ul className="ingredient-list">
                {ingredients.map((ingredient, index) => (
                    <IngredientItem
                        key={index}
                        item={ingredient}
                        onDelete={() => handleOnDelete(ingredient)}
                    />
                ))}
            </ul>
        </section>
    );
};
