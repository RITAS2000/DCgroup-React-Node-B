import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, getEnvVar('JWT_SECRET'));
    req.owner = { id: decoded.id };
    next();
  } catch {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
