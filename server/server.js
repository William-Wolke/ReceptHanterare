//Import modules
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require("cors");
const { response } = require('express');

const app = express();
//Db connections
const url = 'mongodb://127.0.0.1:27017'
const dbName = 'local';

//Connect to Mongo db
MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => {
        // Creating a reference to the database so one can use it later
        const db = client.db(dbName);
        const recipeCollection = db.collection('Recept');
        const ingredientCollection = db.collection('Ingredienser');

        console.log(`Connected MongoDB: ${url}`);
        console.log(`Database: ${dbName}`);

        //Enable cross origin and 
        app.use(cors({
            origin: "*",
            methods:["GET", "POST"],
        }));

        //Body parser
        app.use(bodyParser.urlencoded({ extended: true }));

        //Handlers

        //Listen
        app.listen(8000, () => {
            console.log('listening on 8000');
        });

        //Get a recipe based on query
        app.get('/recept', (req, res) => {
            console.log(req.query);
            console.log(req.query.namn);

            //Filter for query
            let filter = {
                "namn": req.query.namn
            };

            //Query
            recipeCollection.find(filter).toArray()
            .then(result => {
                //console.log(result)
                res.json(result);
            })
            .catch((error) => {
                console.error(error);
                res.status(500);
            });
        });

        //Get all recipes, all attributes are only needed for showing one recipe not showcasing all recipes, therefore the projection to optimize trafic
        app.get('/allaRecept', (req, res) => {
            recipeCollection.find({}, { projection: { "namn": 1, "bild": 1, "bildtext": 1, attribut: { "tid": 1} } }).toArray()
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

        //Create recipe
        app.post('/create', (req, res) => {
            let recipe = req.body;
            let name = req.body.namn;

            //Query to find duplicate recipe
            userCollection.find({"namn": namn}).toArray()
            .then(result => {
                //Result == false if array is empty
                if (result == false) {
                    //Query for inserting the object to the db
                    userCollection.insertOne(recipe)
                        .then(result => {
                            console.log("Recipe created");
                            //Send respons to browser
                            res.status(200);
                        })
                        .catch(error => console.error(error))
                }
                //Array is not empty
                else {
                    console.log("Recipe already exist");
                    res.status(304);
                }
            })
            .catch(error => console.error(error));
        });

        //Login user
        app.post('/login', (req, res) => {
            let name = req.body.name;
            let pass = req.body.pass;

            userCollection.find({ "name": name }).toArray()
                //Promise
                .then(result => {
                    //Check if pass is correct
                    if (result[0].pass === pass) {
                        console.log("Inloggad");
                        //Send respons to browser
                        res.redirect('/')
                    }
                    //Pass is incorrect
                    else {
                        console.log("Fel användarnamn eller lösenord");
                        //Send respons to browser
                        res.redirect('/');
                    }
                })
                .catch(error => console.error(error));
        });
        //Update user password
        app.post('/update', (req, res) => {
            let name = req.body.name;
            let oldPass = req.body.oldPass;
            let newPass = req.body.newPass;
            //Get this user from the db
            userCollection.find({ "name": name }).toArray()
                //Promise
                .then(result => {
                    //Check if pass is correct
                    if (result[0].pass == oldPass) {
                        console.log("Correct credentials")
                        updateUserPass(result[0].name, newPass);
                        //Send respons to browser
                        res.redirect('/')
                    }
                    //Pass is incorrect
                    else {
                        console.log("Incorrect password or username")
                        //Send respons to browser
                        res.redirect('/')
                    }
                })
                .catch(error => console.error(error))
        });
        //Delete user
        app.post('/delete', (req, res) => {
            let name = req.body.name;
            let pass = req.body.pass;
            userCollection.find({ "name": name }).toArray()

                .then(result => {
                    //Check if pass is correct
                    if (result[0].pass == pass) {
                        console.log("Correct credentials")
                        deleteUser(name);
                        //Send respons to browser
                        res.redirect('/')
                    }
                    //Pass is incorrect
                    else {
                        console.log("Incorrect password or username")
                        //Send respons to browser
                        res.redirect('/')
                    }
                })
                .catch(error => console.error(error))
        });
        //Update user pass after checking password
        app.put(updateUserPass = (name, newPass) => {
            userCollection.updateOne({ "name": name }, { $set: { pass: newPass } })
            .then(result => {
                console.log("Password changed")
            })
            .catch(error => console.error(error));
        });
        //Delete user after checking password
        app.delete(deleteUser = (name) => {
            db.collection('Users').deleteOne({ "name": name })
            .then(result => {
                console.log("User deleted")
            })
            .catch(error => console.error(error));
        });
    })
    .catch(error => console.error(error))