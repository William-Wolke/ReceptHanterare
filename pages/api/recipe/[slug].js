export default async function handler(req, res) {
    try {
        const { slug } = req.query;
        const { name } = slug;
        let result = await Recipe.findOne().byName(name).populate('recipes');

        if (!result) {
            res.status(404).json({ message: 'Recource not found' });
        }
        res.status(200).json(result);
    } catch (e) {
        console.error(e.messsage);
        res.status(500);
    }
}
