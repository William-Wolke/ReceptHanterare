const express = require('express');
const Recipe = require('../../models/recipe');
const router = express.Router();

//Get a recipe based on query
router.get('/one/:name', async (req, res) => {
    //Query
    try {
        let result = await Recipe.findOne().byName(req.query.name);
        res.json(result);
    } catch (e) {
        console.error(e.messsage);
        res.status(500);
    }
});

//Get all recipes, all attributes are only needed for showing one recipe not showcasing all recipes, therefore the projection to optimize trafic
router.get('/all', async (req, res) => {
    try {
        let result = await Recipe.find({})
        //Send the array of results
        res.status(200).json(result);
    } catch (e) {
        console.error(error);
        res.status(500);
    }
});



//Create recipe
router.post('/create', async (req, res) => {
    //Query to find duplicate recipe
    try {
        let isDuplicate = await Recipe.findDuplicateName(req.body.name);
        if (isDuplicate) {
            throw new Error("Recipe already exist");
        } else {
            //Query for inserting the object to the db
            let newRecipe = new Recipe(req.body);
            await newRecipe.save();
            
            //Send respons to browser
            res.status(200).send({status: "yes"});
        }
    } catch (e) {
        console.error(e.message);
        res.status(304).json({message: e.message});
    }
});

module.exports = router;