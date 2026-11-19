import '../styles/ingredientSectionStyles.css';

export const IngredientItem = ({ item, onDelete }) => {
    return (
        <div className="ingredient-item">
            <li>{item}</li>
            <button
                className="ingredient-delete-btn"
                type="button"
                onClick={onDelete}
            >
                X
            </button>
        </div>
    );
};
