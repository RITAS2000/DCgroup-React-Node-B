import Recipe from '../db/models/addRecipe.js';

const toInt = (v) => {
  const n = Number(v);
  return Number.isInteger(n) ? n : undefined;
};

export async function addRecipeService({ userId, body, file }) {
  let { ingredients } = body;
  if (typeof ingredients === 'string') {
    try {
      ingredients = JSON.parse(ingredients);
    } catch {
      throw Object.assign(new Error('Ingredients must be valid JSON'), {
        status: 400,
      });
    }
  }
  if (!Array.isArray(ingredients)) ingredients = [];

  let { category } = body;
  if (Array.isArray(category)) {
    category = category.find((v) => typeof v === 'string' && v.trim()) || '';
  }
  if (typeof category !== 'string') category = '';
  category = category.trim();

  const time = toInt(body.time);
  const calories =
    body.calories === '' || body.calories === undefined
      ? undefined
      : toInt(body.calories);

  const doc = {
    owner: userId,
    title: body.title?.trim(),
    description: body.description?.trim(),
    instructions: body.instructions?.trim(),
    time,
    calories,
    category,
    ingredients: ingredients
      .map((i) => ({
        name: String(i?.name ?? '').trim(),
        measure: String(i?.measure ?? '').trim(),
      }))
      .filter((i) => i.name && i.measure),
    thumb: file?.path ?? file?.secure_url ?? undefined,
  };

  const recipe = await Recipe.create(doc);
  return recipe;
}
