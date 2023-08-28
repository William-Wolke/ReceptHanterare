import { getLostIngredients } from '../../../src/db';

export default async function handler(req, res) {
    if (req.method == 'GET') {
        try {
            res.status(200).json({ ingredients: getLostIngredients() });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}
