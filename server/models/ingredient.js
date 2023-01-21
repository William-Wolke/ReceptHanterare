const mongoose = require('mongoose');

// const conversionSchema = new mongoose.Schema({

// })

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    unit: {
        type: Object,
        default: {},
        //TODO Try this
        // preferredUnit: String,
        // conversion: [{
        //     unit: String,
        //     amount: Number
        // }]
        // conversion: [conversionSchema]
    },
    section: {
        type: String,
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
