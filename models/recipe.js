import mongoose from 'mongoose';

export default function recipeSchema() {
    const RecipeSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        alt: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        recipes: {
            type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Recipe' }],
        },
        time: {
            type: Number,
            min: 0,
        },
        portions: {
            type: Number,
            min: 0,
        },
        tags: {
            type: Array,
        },
        ingredients: {
            type: Array,
            required: true,
        },
        steps: {
            type: Array,
            required: true,
        },
    });

    RecipeSchema.statics.findDuplicateName = async function (name) {
        const recipeList = await this.find().byName(name);
        if (recipeList[0] !== undefined) return true;
        return false;
    };

    RecipeSchema.query.byName = function (name) {
        return this.where({ name: name });
    };

    return mongoose.models && 'Recipe' in mongoose.models ? mongoose.models.Recipe : mongoose.model('Recipe', RecipeSchema);
}
