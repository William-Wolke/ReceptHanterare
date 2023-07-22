import { db } from '../../../src/db';

export default async function handler(req, res) {
    try {
        // TODO param validation
        const { slug } = req.query;
        console.log("🚀 ~ handler ~ query:", query)
        if (!slug || slug.length === 0 || slug[0] === undefined || slug[1] === undefined) {
            throw new Error('Couldnt find a matching menu');
        }
        const year = slug[0];
        const week = slug[1];
        let data = await db.Menu.findOne().byYearAndWeek(year, week);
        res.status(200).json(data);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: 'Couldnt fetch data for that resource' });
    }
}
