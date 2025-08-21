import createHttpError from 'http-errors';
import { getCurrentUserService } from '../services/users.js';

export async function getCurrentUserController(req, res) {
  const current = await getCurrentUserService(req.user.id);
  if (!current) {
    throw createHttpError(404, 'User not found');
  }
  res.json({ current });
}
