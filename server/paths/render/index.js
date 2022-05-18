const express = require('express');
const router = express.Router();
const renderWeekMenu = require('../../components/renderWeekMenu');
const fs = require('fs');

router.get('/shoppingList', async (req, res) => {

    let ingredients = [
        { name: 'Gurka', amount: "1", unit: 'st'},
        { name: 'Tomat', amount: "3", unit: 'kg'},
        { name: 'Kattmat', amount: "3", unit: 'ton'}
    ];

    let week = "20";

    let data = renderWeekMenu(week, ingredients);

    let tempFilePath = process.env.tempPath + 'inköpslistaV' + week + '.html';

    try {
        await fs.writeFile(tempFilePath, data, (err) => {
            if (err) {
                return console.error(err);
            }
            res.download(tempFilePath);
        });
    } catch (e) {
        console.error(e.message);
    }
});

module.exports = router;