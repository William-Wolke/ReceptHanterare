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
