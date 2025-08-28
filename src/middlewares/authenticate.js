import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return next(createHttpError(401, 'Please provide Authorization header'));
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return next(createHttpError(401, 'Auth header should be of type Bearer'));
    }

    const session = await SessionsCollection.findOne({ accessToken: token });
    if (!session) {
      return res.status(404).json({ message: 'Session not found or expired' });
    }
    const isExpired =
      Date.now() > new Date(session.accessTokenValidUntil).getTime();
    if (isExpired) {
      return res.status(404).json({
        status: 404,
        message: 'Session not found, please log in again',
      });
    }
    const user = await UsersCollection.findById(session.userId);
    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }

    req.owner = { id: user._id.toString(), name: user.name, email: user.email };
    next();
  } catch {
    next(createHttpError(500, 'Authentication error'));
  }
};

// ** трошки виправила код, бо тут треба вказати що нам потрібно далі для фронта. А нам буде потрібно для зареєстрованого користувача мати його імʼя та першу букву імені в кружечку. Імеил залишила чисто щоб був на всякий виподок для майбутнього досвіду. Також ми маємо 3 файли з аутентификацією. На мою думку цей найкращій інші два можна видалити
//** P.S. OlenaZhuvak
