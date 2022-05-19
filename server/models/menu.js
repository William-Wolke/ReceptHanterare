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
        type: Array
    },
    tuesday: {
        type: Array
    },
    wednesday: {
        type: Array
    },
    thursday: {
        type: Array
    },
    friday: {
        type: Array
    },
    saturday: {
        type: Array
    },
    sunday: {
        type: Array
    },
    shoppingList: {
        type: Array
    }
});

menuSchema.statics.findDuplicateName = async function(name) {
    const menuList = await this.find().byName(name);
    console.log(menuList);
    if (menuList[0] !== undefined) return true;
    return false;
}

menuSchema.query.byYearAndWeek = function(year, week) {
    return this.where({year: new RegExp(year), week: new RegExp(week) });
}

module.exports = mongoose.model('Menu', menuSchema);