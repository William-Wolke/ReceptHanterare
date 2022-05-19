const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    unit: {
        type: Object,
        required: true,
    },
    section: {
        type: String,
        required: true,
        trim: true,
    }
});

ingredientSchema.statics.findDuplicateName = async function(name) {
    const ingredientList = await this.find().byName(name);
    console.log(ingredientList);
    if (ingredientList[0] !== undefined) return true;
    return false;
}

ingredientSchema.query.byName = function(name) {
    return this.where({name: new RegExp(name) });
}

module.exports = mongoose.model('Ingredient', ingredientSchema);