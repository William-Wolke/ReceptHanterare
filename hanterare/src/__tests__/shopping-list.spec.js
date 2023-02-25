import { summarizeShoppingList, toPreferredUnit } from '../helpers';
import data from './data/shopping-list.json';

test('Convert ingredient to preferred unit', () => {
    const results = toPreferredUnit(data.shoppingList, data.ingredients);

    results.forEach((result, index) => {
        const expected = data.expectedToPrefferedShoppingList[index];

        expect(result.unit).toBe(expected.unit);
        expect(result.amount).toBe(expected.amount);
    });
});

test('Summarize shopping list', () => {
    const results = summarizeShoppingList(data.expectedToPrefferedShoppingList, data.ingredients);

    results.forEach((result, index) => {
        const expected = data.expectedSortedShoppingList[index];

        expect(result.unit).toBe(expected.unit);
        expect(result.amount).toBe(expected.amount);
    });
});
