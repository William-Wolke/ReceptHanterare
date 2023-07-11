import { db } from '../../../src/db';
const renderWeekMenu = require('../../components/renderWeekMenu');
const { renderDocxWeekMenu } = require('../../components/createdocx.js');
const fs = require('node:fs');
const path = require('node:path');

router.get('/shoppinglist/docx/:year/:week/', async (req, res) => {
    try {
        if (req.params.year === undefined || req.params.week === undefined) {
            throw new Error('Invalid values for week or year');
        }

        const menu = await db.Menu.findOne().byYearAndWeek(Number(req.params.year), Number(req.params.week));

        if (!menu) {
            throw new Error('Couldnt find a matching menu');
        }

        renderDocxWeekMenu(`inköpslista-${menu.year}-V${menu.week}`, menu.shoppingList);

        res.status(200).download(path.join(process.cwd(), 'temp', `inköpslista-${menu.year}-V${menu.week}.docx`));
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
    }
});

router.get('/shoppinglist/html/:year/:week/', async (req, res) => {
    try {
        if (req.params.year === undefined || req.params.week === undefined) {
            throw new Error('Invalid values for week or year');
        }

        const menu = await Menu.findOne().byYearAndWeek(Number(req.params.year), Number(req.params.week));

        if (!menu) {
            throw new Error('Couldnt find a matching menu');
        }

        const data = renderWeekMenu(menu.year, menu.week, menu.shoppingList);

        const tempFilePath = path.join(process.cwd(), 'temp', 'inköpslista' + menu.year + 'V' + menu.week + '.html');

        try {
            await fs.writeFileSync(tempFilePath, data, (err) => {
                if (err) {
                    return console.error(err);
                }
                res.download(tempFilePath);
            });
        } catch (e) {
            console.error(e.message);
            res.status(500).json({ message: e.message });
        }

        // res.status(200).json({ message: 'ok' });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
