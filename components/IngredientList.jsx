import { useState } from 'react';

export default function IngredientList({ ingredients, servings, recipeServings }) {
    const [ingredientList, setIngredientList] = useState(ingredients);

    function updateChecked(name, checked) {
        const newIngredients = ingredientList.map((ingredient) => {
            if (ingredient.name.title === name) {
                return {
                    name: ingredient.name,
                    amount: ingredient.amount,
                    unit: ingredient.unit,
                    checked: checked,
                };
            }
            return ingredient;
        });
        newIngredients.sort((ingredient) => ingredient.checked)
        setIngredientList(newIngredients);
    }

    if (ingredients?.length === 0) {
        return;
    }

    function getAmount(amount) {
        if (!amount) {
            return amount;
        }
        return parseFloat(amount) * ((servings || recipeServings) / recipeServings).toFixed(2);
    }

    return ingredientList.map((ingredient, index) => {
        return (
            <button
                className="w-full flex flex-row border-b border-gray-300 py-2 px-3 gap-2"
                key={'ingredient' + index}
                type="button"
                onClick={() => {
                    updateChecked(ingredient.name.title, !ingredient.checked);
                }}
                style={{
                    color: ingredient.checked ? 'gray' : 'black',
                }}
            >
                <p className="font-medium">{ingredient.name.title}</p>
                <p className="ml-auto">{getAmount(ingredient.amount)}</p>
                <p>{ingredient.unit}</p>
            </button>
        );
    });
}
