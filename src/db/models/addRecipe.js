import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  measure: { type: String, required: true, trim: true },
});

const recipeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 64 },
    description: { type: String, required: true, trim: true, maxlength: 200 },
    time: { type: Number, required: true, min: 1, max: 360 },
    calories: {
      type: Number,
      min: 1,
      max: 10000,
      required: false,
    },
    category: { type: String, required: true, trim: true },
    ingredients: {
      type: [ingredientSchema],
      validate: {
        validator(arr) {
          return Array.isArray(arr) && arr.length >= 2 && arr.length <= 16;
        },
        message: 'ingredients must contain between 2 and 16 items',
      },
      required: true,
    },
    instructions: { type: String, required: true, trim: true, maxlength: 1200 },
    thumb: { type: String, trim: true },
  },
  {
    collection: 'recipes',
    timestamps: true,
    versionKey: false,
  },
);

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
