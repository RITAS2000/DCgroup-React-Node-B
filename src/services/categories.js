import { CategoriesCollection } from "../db/models/category.js";

export async function getAllCategoriesService() {
  const categories = await CategoriesCollection.find().sort({ name: 1 });
  return categories;
};
