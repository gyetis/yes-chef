import { useState } from 'react';

import '../styles/mainStyles.css';
import { IngredientSection } from './IngredientSection';
import { RecipeSection } from './RecipeSection';
import { getRecipe } from '../ai.js';

export const Main = () => {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [shouldShowRecipe, setShouldShowRecipe] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);

    async function handleGetRecipe() {
        setIsGenerating(true);
        setError(null);
        setRecipe(null);

        try {
            const result = await getRecipe(ingredients);
            setRecipe(result);
            setShouldShowRecipe(true);
        } catch (requestError) {
            console.error('Failed to generate recipe:', requestError);
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : 'An unexpected error occurred while generating the recipe.'
            );
            setShouldShowRecipe(false);
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <main>
            <IngredientSection
                ingredients={ingredients}
                setIngredients={setIngredients}
                setShouldShowRecipe={setShouldShowRecipe}
                isGenerating={isGenerating}
                onGetRecipe={handleGetRecipe}
            />
            {error && <p role="alert">{error}</p>}
            {shouldShowRecipe && <RecipeSection recipe={recipe} />}
        </main>
    );
};
