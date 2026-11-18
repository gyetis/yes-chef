import { useState } from 'react';

import '../styles/mainStyles.css';
import { IngredientItem } from './IngredientItem';

export const Main = () => {
    const [ingredients, setIngredients] = useState([]);

    function handleOnSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const ingredient = String(formData.get('ingredient') ?? '').trim();

        if (!ingredient || ingredient.length === 0) return;

        setIngredients((current) =>
            current.includes(ingredient) ? current : [...current, ingredient]
        );
        event.currentTarget.reset();
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
        <main>
            <p>
                Your personal chef to create recipes with ingredients you
                already have!
            </p>
            <form onSubmit={handleOnSubmit}>
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
            <ul className="ingredient-list">
                {ingredients.map((ingredient, index) => (
                    <IngredientItem
                        key={index}
                        item={ingredient}
                        onDelete={() => handleOnDelete(ingredient)}
                    />
                ))}
            </ul>
        </main>
    );
};
