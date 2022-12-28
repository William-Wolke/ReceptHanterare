const express = require('express');
const Menu = require('../../models/menu');
const router = express.Router();

//Get all ingredients
router.get('/all', async (req, res) => {
    try {
        let data = await Menu.find({});
        res.status(200).json(data);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: 'Couldnt fetch data for that resource' });
    }
});

router.get('/one/:year/:week/', async (req, res) => {
    try {
        if (req.params.year === undefined || req.params.week === undefined) {
            throw new Error('Couldnt find a matching menu');
        }
        let data = await Menu.findOne().byYearAndWeek(req.params.year, req.params.week);
        res.status(200).json(data);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: 'Couldnt fetch data for that resource' });
    }
});

//Create ingredient
router.post('/create', async (req, res) => {
    try {
        let isDuplicate = await Menu.findDuplicateYearAndWeek(req.body.year, req.body.week);

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
});

module.exports = router;
