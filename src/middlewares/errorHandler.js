import { isHttpError } from 'http-errors';

export function errorHandler(error, req, res, next) {
  console.error('Error from errorHandler:', error); // повний обʼєкт помилки
  console.error(error.stack); // покажемо стек-трейс, де саме зʼявилася помилка

  if (isHttpError(error) === true) {
    return res
      .status(error.statusCode)
      .json({ status: error.statusCode, message: error.message });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
  });
}
