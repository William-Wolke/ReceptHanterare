import { useState } from 'react';

export default function IngredientSectionList({ sections }) {
    const [ingredientSections, setIngredientSections] = useState(sections);

    function updateChecked(name, checked) {
        const newIngredientSections = ingredientSections.map((section) => {
            const newIngredients = section.ingredients.map((ingredient) => {
                if (ingredient.ingredient.title === name) {
                    return {
                        ingredient: ingredient.ingredient,
                        amount: ingredient.amount,
                        unit: ingredient.unit,
                        checked: checked,
                    };
                }
                return ingredient;
            });
            newIngredients.sort((ingredient) => ingredient.checked)
            return { ...section, ingredients: newIngredients };
        });
        setIngredientSections(newIngredientSections);
    }

    if (ingredientSections?.length === 0) {
        return;
    }

    return ingredientSections.map((section, index) => {
        if (section.ingredients.length === 0) {
            return;
        }
        return (
            <div key={index}>
                <h4 className="text-lg">{section.name}</h4>
                <div className="border border-gray-300 rounded-lg text-base">
                    {section.ingredients.map((ingredient, index) => {
                        return (
                            <button
                                className="w-full flex flex-row border-b border-gray-300 py-2 px-3 gap-2"
                                key={'ingredient' + index}
                                type="button"
                                onClick={() => {
                                    updateChecked(ingredient.ingredient.title, !ingredient.checked);
                                }}
                                style={{
                                    color: ingredient.checked ? 'gray' : 'black',
                                }}
                            >
                                <p className="font-medium">{ingredient.ingredient.title}</p>
                                <p className="ml-auto">{ingredient.amount}</p>
                                <p>{ingredient.unit}</p>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    });
}