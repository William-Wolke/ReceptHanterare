import constants from './constants.json';

//Returns a array that contains the recipenames for the passed array
export function summarizeNames(array) {
    if (!array?.length) return [];
    return array.map((item) => {
        return item.name;
    });
}

const numOfDecimals = 4;

export function toPreferredUnit(shoppingList, ingredients) {
    return shoppingList.map((item) => {
        const ingredient = ingredients.find(({ name }) => name === item.name);

        let correctUnit = 1;

        if (ingredient?.unit?.preferredUnit === item.unit) {
            return item;
        } else if (ingredient) {
            const correctMetricUnit = constants.metric.find(({ unit }) => unit === item.unit);
            if (correctMetricUnit) {
                correctUnit = correctMetricUnit.convert;
                item.unit = correctMetricUnit.convertTo;
            }

            if (ingredient.unit?.conversion) {
                const ingredientConversion = ingredient.unit.conversion.find((convert) => convert.unit === ingredient.unit.preferredUnit);
                const itemConversion = ingredient.unit.conversion.find((convert) => convert.unit === item.unit && convert.amount);

                if (ingredientConversion?.amount && itemConversion) {
                    item.amount = parseFloat(
                        (item.amount * correctUnit * (ingredientConversion.amount / itemConversion.amount)).toFixed(numOfDecimals),
                    );
                    item.unit = ingredient.unit.preferredUnit;
                    return item;
                }

                return item;
            }
        } else {
            return item;
        }

        return item;
    });
}

export function summarizeShoppingList(shoppingList) {
    //Map through all items in shopping list and all ingredients
    //Summarize the list

    let uniqueList = [];

    shoppingList.forEach((item) => {
        const ingredient = uniqueList.find(({ name, unit }) => name === item.name && unit === item.unit);
        if (ingredient && ingredient.unit === item.unit) {
            let amount = parseFloat(Number(Number(ingredient.amount) + Number(item.amount)).toFixed(numOfDecimals));

            ingredient.amount = amount;
        } else {
            uniqueList.push({
                name: item.name,
                amount: item.amount,
                unit: item.unit,
            });
        }
    });
    return uniqueList;
}

export function getShoppingList(recipes) {
    let shoppingList = [];
    for (const recipe of recipes) {
        if (!recipe || !recipe.name.ingredients || recipe?.name?.ingredients?.length === 0) {
            continue;
        }
        shoppingList = shoppingList.concat(recipe.name.ingredients);
    }
    return shoppingList;
}
