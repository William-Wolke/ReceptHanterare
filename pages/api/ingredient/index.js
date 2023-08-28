import { db } from '../../../src/db';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            //Query to find duplicate recipe
            let isDuplicate = await db.Ingredient.findDuplicateName(req.body.name);
            if (isDuplicate) {
                console.log('Ingredient already exist');
                res.status(304).send({ message: 'Ingredient already exist' });
            } else {
                let newIngredient = new db.Ingredient(req.body);
                await newIngredient.save();
                console.log('Ingredient created');
                res.status(200).send({ message: 'yes' });
            }
        } catch (e) {
            console.error(e.message);
            res.status(500).json({ message: e.message });
        }
        return;
    }

    try {
        const result = await db.Ingredient.find({}).sort({ name: 1 });
        //Send the array of results
        res.status(200).json(result);
    } catch (e) {
        console.error(e.message);
        res.status(500);
    }
}
