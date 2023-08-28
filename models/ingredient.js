import mongoose from 'mongoose';

export default function ingredientSchema() {
    const IngredientSchema = new mongoose.Schema({
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

    IngredientSchema.statics.findDuplicateName = async function (name) {
        const ingredientList = await this.find().byName(name);
        if (ingredientList[0] !== undefined && name === ingredientList[0].name) return true;
        return false;
    };

    IngredientSchema.query.byName = function (name) {
        return this.where({ name: new RegExp(name) });
    };

    return mongoose.models && 'Ingredient' in mongoose.models ? mongoose.models.Ingredient : mongoose.model('Ingredient', IngredientSchema);
}
