import '../styles/recipeSectionStyles.css';
import ReactMarkdown from 'react-markdown';

export const RecipeSection = ({ recipe }) => {
    return (
        <section className="recipe-container" aria-live="polite">
            <h3>Chef Recommends 🎉</h3>
            <ReactMarkdown>{recipe}</ReactMarkdown>
        </section>
    );
};
