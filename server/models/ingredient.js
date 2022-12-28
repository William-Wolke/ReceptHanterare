const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    unit: {
        type: Object,
        default: {},
    },
    section: {
        type: String,
        required: true,
        trim: true,
    },
});

ingredientSchema.statics.findDuplicateName = async function (name) {
    const ingredientList = await this.find().byName(name);
    if (ingredientList[0] !== undefined && name === ingredientList[0].name) return true;
    return false;
};

ingredientSchema.query.byName = function (name) {
    return this.where({ name: new RegExp(name) });
};

module.exports = mongoose.model('Ingredient', ingredientSchema);
