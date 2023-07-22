import { db } from '../../../src/db';
// import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });
// const upload = multer({ storage: storage });

// router.post('/', upload.single('recipe-image')

export default async function handler(req, res) {
    if (req.method == 'POST') {
        // req.file is the `profile-file` file
        // req.body will hold the text fields, if there were any
        console.log(JSON.stringify(req.file));
        console.log(JSON.stringify(req.body));

        try {
            let recipe = await db.Recipe.findById(req.body.id);
            if (recipe) {
                //Query for updating the object
                recipe.image = req.file.path;
                recipe.alt = req.file.alt;
                await newRecipe.save();

                //Send respons to browser
                res.status(200).send({ status: 'image uploaded' });
            }
            throw new Error("Recipe doesn't exist");
        } catch (e) {
            console.error(e.message);
            res.status(304).json({ message: e.message });
        }
    }
    res.sendFile('../.. /pages/upload.html', { root: __dirname });
}
