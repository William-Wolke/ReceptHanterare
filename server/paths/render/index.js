const express = require('express');
const router = express.Router();
const Menu = require('../../models/menu');
const renderWeekMenu = require('../../components/renderWeekMenu');
const { renderDocxWeekMenu } = require('../../components/createdocx.js');
const fs = require('node:fs');
const path = require('node:path');

router.get('/shoppinglist/:year/:week/:format', async (req, res) => {
    try {
        if (req.params.year === undefined || req.params.week === undefined) {
            throw new Error('Invalid values for week or year');
        }

        const menu = await Menu.findOne().byYearAndWeek(Number(req.params.year), Number(req.params.week));

        if (!menu) {
            throw new Error('Couldnt find a matching menu');
        }

        //Send docx file or html file, default: html
        if (req.params.format === 'docx') {
            renderDocxWeekMenu(`inköpslista-${menu.year}-V${menu.week}`, menu.shoppingList);

            res.status(200).download(path.join(process.cwd(), 'documents', `inköpslista-${menu.year}-V${menu.week}.docx`));
        } else {
            const data = renderWeekMenu(menu.year, menu.week, menu.ingredients);

            const tempFilePath = path.join(__dirname, '/temp/' + 'inköpslistaV' + menu.week + '.html');

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
        }

        // res.status(200).json({ message: 'ok' });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
