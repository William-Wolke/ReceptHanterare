import mongoose from 'mongoose';

export default function menuSchema() {
    const MenuSchema = new mongoose.Schema({
        year: {
            type: Number,
            required: true,
        },
        week: {
            type: Number,
            required: true,
        },
        monday: {
            type: Array,
        },
        tuesday: {
            type: Array,
        },
        wednesday: {
            type: Array,
        },
        thursday: {
            type: Array,
        },
        friday: {
            type: Array,
        },
        saturday: {
            type: Array,
        },
        sunday: {
            type: Array,
        },
        shoppingList: {
            type: Array,
        },
    });

    MenuSchema.statics.findDuplicateYearAndWeek = async function (year, week) {
        const menuList = await this.find().byYearAndWeek(year, week);
        if (menuList[0] !== undefined) return true;
        return false;
    };

    MenuSchema.query.byYearAndWeek = function (year, week) {
        return this.where({ year: year, week: week });
    };

    return mongoose.models && 'Menu' in mongoose.models ? mongoose.models.Menu : mongoose.model('Menu', MenuSchema);
}
