const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        // required: true,
        trim: true,
    },
    alt: {
        type: String,
        // required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    attribute: {
        type: Object,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    steps: {
        type: Array,
        required: true,
    }
});

recipeSchema.statics.findDuplicateName = async function(name) {
    const recipeList = await this.find().byName(name);
    if (recipeList[0] !== undefined) return true;
    return false;
}

recipeSchema.query.byName = function(name) {
    return this.where({name: name});
}

module.exports = mongoose.model('Recipe', recipeSchema);