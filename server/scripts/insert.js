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
    await insertMenuData();
    await insertIngredientData();
    await insertRecipeData();
}

const insertMenuData = async () => {

    console.log('Inserting menu data...');
    
    await menuData.map(async (item) => {
        try {
            let newMenu = new Menu(item);
            let result = await newMenu.save()
            
            console.log('Saved');
                
        } catch (e) {
            console.error(e.message);
        }
    });
}

const insertIngredientData = async () => {

    console.log('Inserting menu data...');
    
    await ingredientData.map(async (item) => {
        try {
            let newIngredient = new Ingredient(item);
            let result = await newIngredient.save()
            
            console.log('Saved');

        } catch (e) {
            console.error(e.message);
        }
    });
}

const insertRecipeData = async () => {

    console.log('Inserting menu data...');
    
    await recipeData.map(async (item) => {
        try {
            let newRecipe = new Recipe(item);
            let result = await newRecipe.save()
            
            console.log('Saved');

        } catch (e) {
            console.error(e.message);
        }
    });
}

//Connect to Mongo db
mongoose.connect(process.env.DB_URL, options);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected'));

insertTestdata();

module.exports = insertTestdata;