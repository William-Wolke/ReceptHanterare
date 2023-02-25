const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
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

menuSchema.statics.findDuplicateYearAndWeek = async function (year, week) {
    const menuList = await this.find().byYearAndWeek(year, week);
    if (menuList[0] !== undefined) return true;
    return false;
};

menuSchema.query.byYearAndWeek = function (year, week) {
    return this.where({ year: year, week: week });
};

module.exports = mongoose.model('Menu', menuSchema);
