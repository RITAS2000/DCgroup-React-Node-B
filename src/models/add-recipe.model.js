import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
});

const recipeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    time: { type: Number, required: true },
    calories: { type: Number },
    category: { type: String, required: true, trim: true },
    ingredients: [ingredientSchema],
    instructions: { type: String, required: true, trim: true },
    photo: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'recepies' },
);

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
