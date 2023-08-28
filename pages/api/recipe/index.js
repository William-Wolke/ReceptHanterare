import { db } from '../../../src/db';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        //Query to find duplicate recipe
        try {
            let isDuplicate = await db.Recipe.findDuplicateName(req.body.name);
            if (isDuplicate) {
                throw new Error('Recipe already exist');
            } else {
                //Query for inserting the object to the db
                let newRecipe = new db.Recipe(req.body);
                await newRecipe.save();

                //Send respons to browser
                res.status(200).send({ status: 'yes' });
            }
        } catch (e) {
            console.error(e.message);
            res.status(304).json({ message: e.message });
        }
    }

    try {
        const result = await db.Recipe.find({}).populate('recipes');
        //Send the array of results
        res.status(200).json(result);
    } catch (e) {
        console.error(e.message);
        res.status(500);
    }
}
