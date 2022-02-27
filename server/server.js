//Import modules
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require("cors");
const { response } = require('express');
const app = express();
const multer = require('multer');
const url = 'mongodb://127.0.0.1:27017'
const dbName = 'local';

//Connect to Mongo db
MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => {
        // Storing a reference to the database so you can use it later
        const db = client.db(dbName);
        const recipeCollection = db.collection('Recipe');
        const ingredientCollection = db.collection('Ingredient');
        console.log(`Connected MongoDB: ${url}`);
        console.log(`Database: ${dbName}`);

        app.use(cors());
        
        //Body parser
        app.use(bodyParser.urlencoded({ extended: true }));

        //Using multer to handle files/images
        app.use(multer({ dest: './temp/' }).any());

        //Handlers

        //Listen
        app.listen(8000, () => {
            console.log('listening on 8000');
        });
        //Get file on site enter
        app.get('/recept', (req, res) => {
            console.log(req.query);
            console.log(req.query.namn);

            let filter = {
                "namn": req.query.namn
            };
            recipeCollection.find(filter).toArray()
            .then(result => {
                //console.log(result)
                res.json(result)
            })
            .catch(error => console.error(error));
        });
        //Ladda in alla recept
        app.get('/allaRecept', (req, res) => {
            recipeCollection.find({}, { projection: { "namn": 1, "bild": 1, "bildtext": 1, attribut: { "tid": 1} } }).toArray()
            .then(result => {
                console.log(result);
                res.json(result);
            })
            .catch(error => console.error(error));
        });

        //
        app.get("/allaIngredienser", (req, res) => {
            
            ingredientCollection.find({}).toArray()
            .then(result => {
                console.log(result);
                res.json(result);
            })
            .catch(error => console.error(error));
        });
        //Create user
        app.post('/create', (req, res) => {
            let name = req.body.name;
            userCollection.find({"name": name}).toArray(req)
            .then(result => {
                //Result == false if array is empty
                if (result == false) {
                    userCollection.insertOne(req.body)
                        .then(result => {
                            console.log("User created");
                            //Send respons to browser
                            res.redirect('/');
                        })
                        .catch(error => console.error(error))
                }
                //Array is not empty
                else {
                    console.log("User already exist");
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