require('dotenv').config();
const mongoose = require('mongoose');
const Menu = require('../models/menu.js');
const Ingredient = require('../models/ingredient.js');
const Recipe = require('../models/recipe.js');

const menuData = require('./data/menu.json');
const recipeData = require('./data/recipe.json');
const ingredientData = require('./data/ingredient.json');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

const insertTestdata = async () => {
    console.log('Hello');
    let [ savedMenus, menuErrors ] = await insertMenuData();
    let [ savedIngredients, ingredientErrors ] = await insertIngredientData();
    let [ savedRecipes, recipeErrors ] = await insertRecipeData();
    console.log(`
        Saved menus: ${savedMenus}
        Saved ingredients: ${savedIngredients}
        Saved recipes: ${savedRecipes}
    
        # of errors: ${menuErrors + ingredientErrors + recipeErrors}
        ${menuErrors ? `Errors saving menus: ${menuErrors}` : ``}
        ${ingredientErrors ? `Errors saving ingredients: ${ingredientErrors}` : ``}
        ${recipeErrors ? `Errors saving recipes: ${recipeErrors}` : ``}
    `);
}

const insertMenuData = async () => {

    console.log('Inserting menu data...');


    let saved = 0;
    let errors = 0;

    await menuData.map(async (item) => {
        try {
            await new Menu(item).save()
            saved = saved + 1;
        } catch (e) {
            console.error(e.message);
            errors = errors + 1;
        }
    });

    return [ saved, errors ];
}

const insertIngredientData = async () => {

    console.log('Inserting ingredient data...');

    let saved = 0;
    let errors = 0;

    await ingredientData.map(async (item) => {
        try {
            await new Ingredient(item).save()
            saved = saved + 1;
        } catch (e) {
            console.error(e.message);
            errors = errors + 1;
        }
    });

    return [ saved, errors ];
}

const insertRecipeData = async () => {

    console.log('Inserting recipe data...');


    let saved = 0;
    let errors = 0;

    await recipeData.map(async (item) => {
        try {
            await new Recipe(item).save()
            saved = saved + 1;
        } catch (e) {
            console.error(e.message);
            errors = errors + 1;
        }
    });

    return [ saved, errors ];
}

//Connect to Mongo db
mongoose.connect(process.env.DB_URL, options);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
    console.log('Connected');
    insertTestdata();
});

module.exports = insertTestdata;