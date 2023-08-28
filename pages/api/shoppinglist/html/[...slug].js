import fs from 'node:fs';
import { db } from '../../../../src/db';
import renderWeekMenu from '../../../../src/renderWeekMenu';

export default async function handler() {
    try {
        const slug = req.query.slug;
        const [year, week] = slug;
        if (year === undefined || week === undefined) {
            throw new Error('Invalid values for week or year');
        }

        const menu = await db.Menu.findOne().byYearAndWeek(Number(req.params.year), Number(req.params.week));

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
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
    }
}
