//Import modules
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const cors = require('cors');


//const multer = require('multer');

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'local';
const port = 8000;

//Connect to Mongo db
MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => {
        // Creating a reference to the database so one can use it later
        const db = client.db(dbName);
        const recipeCollection = db.collection('Recipe');
        const ingredientCollection = db.collection('Ingredient');
        const menuCollection = db.collection('Menu');

        console.log(`Connected MongoDB: ${url}`);
        console.log(`Database: ${dbName}`);

        app.use(cors({
            accept:'*',
            method:'POST, GET'
        }));
        
        //Body parser
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json())

        //Using multer to handle files/images
        //app.use(multer({ dest: './temp/' }).any());

        //Handlers

        //Listen
        app.listen(port, () => {
            console.log('listening on ' + port);
        });

        //Get a recipe based on query
        app.get('/recept', (req, res) => {
            console.log(req.query);
            console.log(req.query.name);

            //Filter for query
            let filter = {
                "name": req.query.name
            };

            console.log(filter);

            //Query
            recipeCollection.find(filter).toArray()
            .then(result => {
                console.log(result)
                res.json(result);
            })
            .catch((error) => {
                console.error(error);
                res.status(500);
            });
        });

        //Get all recipes, all attributes are only needed for showing one recipe not showcasing all recipes, therefore the projection to optimize trafic
        app.get('/allaRecept', (req, res) => {
            recipeCollection.find({}).toArray()
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

        //Get all ingredients
        app.get("/allaIngredienser", (req, res) => {
            
            //Query for all recipes
            ingredientCollection.find({}).toArray()
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

        //Get all ingredients
        app.get("/allMenus", (req, res) => {
            
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

        //Create recipe
        app.post('/createRecipe', (req, res) => {
            console.log("Börjar skapa");
            //Query to find duplicate recipe
            recipeCollection.find({"name": req.body.name}).toArray()
            .then(result => {
                console.log("Första hämt");
                //Result == false if array is empty
                if (result == false) {
                    console.log("Ingen dup");
                    //Query for inserting the object to the db
                    recipeCollection.insertOne(req.body)
                        .then(result => {
                            console.log("Recipe created");
                            //Send respons to browser
                            res.status(200).send({status: "yes"});
                        })
                        .catch(error => {
                            console.error(error);
                            res.status(500);
                        });
                }
                //Array is not empty
                else {
                    console.log("Recipe already exist");
                    res.status(304);
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500);
            });
        });

        //Create ingredient
        app.post('/createIngredient', async (req, res) => {
            console.log("Börjar skapa");

            //Query to find duplicate recipe
            await ingredientCollection.find({"name": req.body.name}).toArray()
            .then( async (result) => {
                console.log("Första hämt");
                //Result == false if array is empty
                if (result == false) {
                    console.log("Ingen dup");
                    //Query for inserting the object to the db
                    await ingredientCollection.insertOne(req.body)
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
                    console.log("Ingredient already exist");
                    res.status(304).send({message: "Ingredient already exist"});
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500);
            });
        });

        //Create ingredient
        app.post('/createMenu', async (req, res) => {

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

    });