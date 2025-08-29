import { UsersCollection } from '../db/models/user.js';

export async function getCurrentUserService(userId) {
  const user = await UsersCollection.findById(userId);
  if (!user) return null;

  // const name = user.name ?? '';
  // const initial = name ? name[0].toUpperCase() : '';
  // return { name, initial };
  return user;
}

// ** Тут логіка сервисной функції та знов чітко вказуємо те що нам буде треба для фронта, для залогіненого юзера
