import { db } from '../../../src/db';

export default async function handler(req, res) {
    try {
        // TODO param validation
        const { slug } = req.query;
        const [year, week] = slug;
        if (year === undefined || week === undefined) {
            throw new Error('Couldnt find a matching menu');
        }
        let data = await db.Menu.findOne().byYearAndWeek(req.params.year, req.params.week);
        res.status(200).json(data);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: 'Couldnt fetch data for that resource' });
    }
}
