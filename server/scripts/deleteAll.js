require('dotenv').config();
const mongoose = require('mongoose');
const Menu = require('../models/menu.js');
const Ingredient = require('../models/ingredient.js');
const Recipe = require('../models/recipe.js');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
};

const deleteAllData = async () => {
    let menuResult = await Menu.deleteMany({});
    if (menuResult) console.log('Deleted Menu');
    let ingredientResult = await Ingredient.deleteMany({});
    if (ingredientResult) console.log('Deleted Ingredient');
    recipeResult = await Recipe.deleteMany({});
    if (recipeResult) console.log('Deleted Recipe');
};

//Connect to Mongo db
mongoose.connect(process.env.DB_URL, options);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', async () => {
    console.log('Connected');
    await deleteAllData();

    process.exit(0);
});

module.exports = deleteAllData;
