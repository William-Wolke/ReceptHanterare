import constants from './data/constants.json';

//Returns a array that contains the recipenames for the passed array
export const summarizeNames = (array) => {
    return array.map((item) => {
        return item.name;
    });
};

const numOfDecimals = 4;

export const toPreferredUnit = (shoppingList, ingredients) => {
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
                        (item.amount * correctUnit * (ingredientConversion.amount / itemConversion.amount)).toFixed(numOfDecimals)
                    );
                    item.unit = ingredient.unit.preferredUnit;
                    return item;
                }

                return item;
            }
        } else {
            return item;
        }

        // ingredients.map((ingredient) => {
        //     if (item.name === ingredient.name) {
        //         if (item.unit !== ingredient.unit.preferredUnit) {
        //             ingredient.unit?.conversion?.map((unit) => {
        //                 if (unit.unit === ingredient.unit?.preferredUnit) {
        //                     constants.metric.map((metric) => {
        //                         if (metric.unit === item.unit) {
        //                             //Convert from
        //                             item.amount = Number(item.amount * unit.amount * metric.convert);
        //                             item.unit = ingredient.unit.preferredUnit;
        //                         }
        //                     });
        //                 }
        //             });
        //         }
        //     }
        // });

        return item;
    });
};

export const summarizeShoppingList = (shoppingList, ingredients) => {
    //Convert all shopping items to prefered units
    shoppingList = toPreferredUnit(shoppingList, ingredients);

    //Map through all items in shopping list and all ingredients
    //Summarize the list

    let uniqueList = [];

    shoppingList.forEach((item) => {
        const ingredient = uniqueList.find(({ name, unit }) => {if (name === item.name && unit === item.unit) {console.log(name, item.name, unit, item.unit); return true}});
        // console.log('hello', item, 'bye', ingredient);

        
        if (ingredient && ingredient.unit === item.unit) {
            let amount = parseFloat((ingredient.amount + item.amount).toFixed(numOfDecimals));

            console.log("adding", ingredient.amount, "with", item.amount)
            console.log("result", amount);
            ingredient.amount = amount;
        } else {
            console.log("pushing", item)
            uniqueList.push({
                name: item.name,
                amount: item.amount,
                unit: item.unit,
            });
        }
    });
    return uniqueList;
};
