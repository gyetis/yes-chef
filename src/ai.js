import { GoogleGenAI } from '@google/genai';

export async function getRecipe(ingredientsArr) {
    const accessToken = import.meta.env.VITE_GOOGLE_AI_API_KEY;
    if (!accessToken) {
        throw new Error(
            'Missing VITE_GOOGLE_AI_API_KEY. Add your Hugging Face token to the .env file and restart the dev server.'
        );
    }

    const googleGenAI = new GoogleGenAI({
        apiKey: accessToken,
        apiVersion: 'v1',
    });

    const response = await googleGenAI.interactions.create({
        model: 'gemini-3.5-flash-lite',
        input: ingredientsArr.join(', '),
        system_instruction: ` You are an assistant that receives a list of ingredients and suggests a recipe they could make with some or all of them. You may include a few additional ingredients. Return only valid JSON with this shape: {"introduction":"...","name":"...","ingredients":["..."],"instructions":["..."]}. Do not wrap the JSON in markdown or a code fence.`,
    });

    const content = response.output_text;
    if (typeof content !== 'string') {
        throw new Error('The recipe service returned an empty response.');
    }

    const jsonContent = content
        .trim()
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```$/, '');

    let recipe;
    try {
        recipe = JSON.parse(jsonContent);
    } catch {
        throw new Error(
            'The recipe service returned an unreadable response. Please try again.'
        );
    }

    if (
        !recipe ||
        typeof recipe !== 'object' ||
        typeof recipe.name !== 'string' ||
        typeof recipe.introduction !== 'string' ||
        !Array.isArray(recipe.ingredients) ||
        !recipe.ingredients.every(
            (ingredient) => typeof ingredient === 'string'
        ) ||
        !Array.isArray(recipe.instructions) ||
        !recipe.instructions.every(
            (instruction) => typeof instruction === 'string'
        )
    ) {
        throw new Error(
            'The recipe service returned a recipe in an unexpected format. Please try again.'
        );
    }

    return recipe;
}
