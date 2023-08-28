import { db } from '../../../../src/db';
import renderDocxWeekMenu from '../../../../src/createDocx';
import path from 'node:path';

export default async function handler(req, res) {
    if (req.method === 'GET') {
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
    }
}
