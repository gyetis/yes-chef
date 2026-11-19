import '../styles/recipeSectionStyles.css';

export const RecipeSection = ({ recipe }) => {
    return (
        <section>
            <h3>Chef Recommends {recipe.name} 🎉</h3>
            <article className="recipe-container" aria-live="polite">
                <p>{recipe.introduction}</p>
                <strong>Ingredients:</strong>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => {
                        return <li key={index}>{ingredient}</li>;
                    })}
                </ul>
                <strong>Instructions:</strong>
                <ol>
                    {recipe.instructions.map((instruction, index) => {
                        return <li key={index}>{instruction}</li>;
                    })}
                </ol>
            </article>
        </section>
    );
};
