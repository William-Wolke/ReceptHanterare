const express = require('express');
const Ingredient = require('../../models/ingredient');
const router = express.Router();

//Get all ingredients
router.get("/all", async (req, res) => {
    try {
        let result = await Ingredient.find({})
        //Send the array of results
        res.status(200).json(result);
    } catch (e) {
        console.error(error);
        res.status(500);
    }
});
//Create ingredient
router.post('/create', async (req, res) => {
    try {
        //Query to find duplicate recipe
        let isDuplicate = await Ingredient.findDuplicateName(req.body.name);
        if (isDuplicate) {
            console.log("Ingredient already exist");
            res.status(304).send({message: "Ingredient already exist"});
        } else {
            let newIngredient = new Ingredient(req.body);
            await newIngredient.save();
            console.log("Ingredient created");
            res.status(200).send({message: "yes"});
        }
    } catch (e) {
        console.error(e.message);
        res.status(500).json({message: e.message});
    }
});

module.exports = router;