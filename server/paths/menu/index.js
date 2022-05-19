const express = require('express');
const Menu = require('../../models/menu');
const router = express.Router();

//Create ingredient
router.post('/createMenu', async (req, res) => {

    //Query to find duplicate recipe
    await menuCollection.find({"year": req.body.year, "week": req.body.week}).toArray()
    .then( async (result) => {

        //Result == false if array is empty
        if (result == false) {
            //Query for inserting the object to the db
            await menuCollection.insertOne(req.body)
                .then(result => {
                    console.log("Recipe created");
                    //Send respons to browser
                    res.status(200).send({message: "yes"});
                })
                .catch(error => {
                    console.error(error);
                    res.status(500);
                });
        }

        //Array is not empty
        else {
            res.status(304).send({message: "Menu already exist"});
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500);
    });
});

//Get all ingredients
router.get("/allMenus", (req, res) => {
    
    //Query for all recipes
    menuCollection.find({}).toArray()
    .then(result => {
        console.log(result);
        //Send the array of results
        res.status(200).json(result);
    })
    .catch((error) => {
        console.error(error);
        res.status(500);
    });
});

module.exports = router;