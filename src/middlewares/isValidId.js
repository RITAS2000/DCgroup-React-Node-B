// import createHttpError from 'http-errors';
// import { isValidObjectId } from 'mongoose';

// export const isValidId = (req, res, next) => {
//   const { recipeId } = req.params;
//   if (!isValidObjectId(recipeId)) {
//     throw createHttpError(400, 'Bad Request');
//   }
//   next();
// };
// ====================================================================================
// import createHttpError from 'http-errors';
// import { isValidObjectId } from 'mongoose';

// const skipIds = ['/own', '/saved-recipes']; // маршрути, що не перевіряємо

// export const isValidId = (req, res, next) => {
//   const { recipeId } = req.params;

//   // Якщо маршрут у білому списку, пропускаємо
//   if (skipIds.includes(req.path)) {
//     return next();
//   }

//   if (!isValidObjectId(recipeId)) {
//     throw createHttpError(400, 'Bad Request');
//   }

//   next();
// };
//======================================================================================

import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { recipeId } = req.params;

  // якщо в цьому роуті немає recipeId – пропускаємо
  if (!recipeId) {
    return next();
  }

  if (!isValidObjectId(recipeId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
