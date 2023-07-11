import { db } from '../../../src/db';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            let isDuplicate = await db.Menu.findDuplicateYearAndWeek(req.body.year, req.body.week);

            if (isDuplicate) {
                throw new Error('Menu already exist');
            } else {
                let newMenu = new Menu(req.body);
                await newMenu.save();

                res.status(201).json({ message: 'Created menu' });
            }
        } catch (e) {
            console.error(e.message);
            res.status(500).json({ message: 'Couldnt create menu' });
        }
    }

    try {
        let data = await db.Menu.find({});
        res.status(200).json(data);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: 'Couldnt fetch data for that resource' });
    }
}
