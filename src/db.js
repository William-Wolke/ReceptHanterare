import getConfig from 'next/config';
import mongoose from 'mongoose';
import menuSchema from '../models/menu';
import recipeSchema from '../models/recipe';
import ingredientSchema from '../models/ingredient';

const { serverRuntimeConfig } = getConfig();

// TODO use next example for db
// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js

mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
mongoose.Promise = global.Promise;

export const db = {
    Menu: menuSchema(),
    Recipe: recipeSchema(),
    Ingredient: ingredientSchema(),
};

export async function getLostIngredients() {
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

    return lostIngredients;
}
