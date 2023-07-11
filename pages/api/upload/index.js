const express = require('express');
const Recipe = require('../../models/recipe');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });


router.get('/', function (req, res) {
    res.sendFile('../.. /pages/upload.html', { root: __dirname });
})

router.post('/', upload.single('recipe-image'), async function (req, res) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file));
    console.log(JSON.stringify(req.body))

    try {
        let recipe = await Recipe.findById(req.body.id);
        if (recipe) {
            //Query for updating the object
            recipe.image = req.file.path;
            recipe.alt = req.file.alt;
            await newRecipe.save();

            //Send respons to browser
            res.status(200).send({ status: "image uploaded" });
        }
        throw new Error("Recipe doesn't exist");
    } catch (e) {
        console.error(e.message);
        res.status(304).json({ message: e.message });
    }
});

module.exports = router;