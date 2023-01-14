const express = require('express');
const Ingredient = require('../../models/ingredient');
const Recipe = require('../../models/recipe');
const router = express.Router();

//Get all ingredients
router.get('/all', async (req, res) => {
    try {
        const result = await Ingredient.find({}).sort({ name: 1 });
        //Send the array of results
        res.status(200).json(result);
    } catch (e) {
        console.error(e.message);
        res.status(500);
    }
});

router.get('/lost', async (req, res) => {
    try {
        const definedIngredients = await Ingredient.find({});
        const menus = await Recipe.find({});
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
});

//Create ingredient
router.post('/create', async (req, res) => {
    try {
        //Query to find duplicate recipe
        let isDuplicate = await Ingredient.findDuplicateName(req.body.name);
        if (isDuplicate) {
            console.log('Ingredient already exist');
            res.status(304).send({ message: 'Ingredient already exist' });
        } else {
            let newIngredient = new Ingredient(req.body);
            await newIngredient.save();
            console.log('Ingredient created');
            res.status(200).send({ message: 'yes' });
        }
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
