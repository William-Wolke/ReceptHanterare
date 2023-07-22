import { db } from '../../../src/db';

export default async function handler(req, res) {
    if (req.method == 'GET') {
        try {
            const definedIngredients = await db.Ingredient.find({});
            const menus = await db.Recipe.find({});
            let ingredients = [];
            let lostIngredients = [];

            menus.forEach((menuItem) => {
                ingredients = [...ingredients, ...menuItem.ingredients];
            });

            ingredients.forEach((ingredientItem) => {
                if (!ingredientItem) return;
                const found = definedIngredients.some(({ name }) => name === ingredientItem.name);

                if (!found) {
                    lostIngredients.push(ingredientItem);
                }
            });

            res.status(200).json(lostIngredients);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}
