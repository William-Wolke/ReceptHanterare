//Returns a array that contains the recipenames for the passed array
export const summarizeNames = (array) => {
    return array.map((item) => {
        return item.name;
    });
};

export const summarizeShoppingList = (shoppingList, ingredients) => {
    //Convert all shopping items to prefered units

    const metric = [
        {
            unit: 'Kg',
            convert: 1000,
        },
        {
            unit: 'Hg',
            convert: 100,
        },
        {
            unit: 'Mg',
            convert: 0.001,
        },
        {
            unit: 'Dl',
            convert: 0.1,
        },
        {
            unit: 'Cl',
            convert: 0.01,
        },
        {
            unit: 'Ml',
            convert: 0.001,
        },
        {
            unit: 'Msk',
            convert: 0.015,
        },
        {
            unit: 'Tsk',
            convert: 0.005,
        },
        {
            unit: 'Krm',
            convert: 0.001,
        },
    ];

    //Map through all items in shopping list and all ingredients
    shoppingList.map((item) => {
        ingredients.map((ingredient) => {
            if (item.name === ingredient.name) {
                if (item.unit !== ingredient.unit.preferredUnit) {
                    ingredient.unit.conversion.map((unit) => {
                        if (unit.unit === ingredient.unit.preferredUnit) {
                            metric.map((metric) => {
                                if (metric.unit === item.unit) {
                                    //Convert from
                                    item.amount = Number(
                                        item.amount *
                                            unit.amount *
                                            metric.convert
                                    );
                                    item.unit =
                                        ingredient.unit.preferredUnit;
                                }
                            });
                        }
                    });
                }
            }
        });
    });

    //Summarize the list

    let uniqueList = [];

    shoppingList.map((item) => {
        //Runs on first iteration when list is emprty
        if (uniqueList.length === 0) {
            uniqueList.push({
                name: item.name,
                amount: item.amount,
                unit: item.unit,
            });
        }

        //Runs on all iterations exept first
        else if (uniqueList.length > 0) {
            //If name i present in the array
            let found = uniqueList.some(
                (element) => element.name === item.name
            );

            //No duplicates found, push new item to array
            if (!found) {
                uniqueList.push({
                    name: item.name,
                    amount: item.amount,
                    unit: item.unit,
                });
            }

            //Duplicates found, instead add the amount to total amount
            else {
                uniqueList.map((element) => {
                    if (element.name === item.name) {
                        element.amount -= Number(-item.amount);
                    }
                });
            }
        }
    });
    return uniqueList;
};