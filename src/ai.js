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
        system_instruction: `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page`,
    });

    const content = response.output_text;
    if (typeof content !== 'string') {
        throw new Error('The recipe service returned an empty response.');
    }

    return content;
}
