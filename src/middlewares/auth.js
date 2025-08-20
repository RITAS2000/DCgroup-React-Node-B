import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';

const JWT_SECRET = getEnvVar('JWT_SECRET');

export function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    return res
      .status(401)
      .json({ status: 401, message: 'Please provide a valid token' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.id };
    next();
  } catch {
    return res
      .status(401)
      .json({ status: 401, message: 'Please provide a valid token' });
  }
}
