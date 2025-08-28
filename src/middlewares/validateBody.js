import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  return async (req, res, next) => {
    // --- конвертуємо ingredients, якщо це рядок ---
    if (req.body.ingredients && typeof req.body.ingredients === 'string') {
      try {
        req.body.ingredients = JSON.parse(req.body.ingredients);
      } catch {
        return next(createHttpError(400, 'Invalid ingredients format'));
      }
    }

    // --- твій оригінальний await залишаємо на місці ---
    try {
      console.log('ingredients after parsing:', req.body.ingredients);
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err) {
      const errors = err.details.map((detail) => detail.message);
      throw createHttpError(400, 'Bad Request', { errors });
    }
  };
};
