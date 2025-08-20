import mongoose from 'mongoose';

const IngredientEntrySchema = new mongoose.Schema(
  {
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true,
    },
    // строка по ТЗ, min:2 max:16 (валидировать можно на уровне DTO/валидации)
    ingredientAmount: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 16,
    },
  },
  { _id: false },
);

const RecipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 64 },
    decr: { type: String, required: true, maxlength: 200 },
    cookiesTime: { type: Number, required: true, min: 1, max: 360 },
    cals: { type: Number, min: 1, max: 10000 }, // optional
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    ingredients: {
      type: [IngredientEntrySchema],
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    instruction: { type: String, required: true, maxlength: 1200 },
    recipeImg: { type: String }, // для GET возвращаем URL (загрузка — отдельно)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// удобный toJSON → id вместо _id
RecipeSchema.method('toJSON', function () {
  const obj = this.toObject({ virtuals: false });
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
});

export const Recipe = mongoose.model('Recipe', RecipeSchema);
