import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser } from '../types';
import { getUserByUsername } from '../service/user.service';

async function userLogin(user: IUser) {
  const { username, password } = user;

  // if validation will extend, it should be moved to a separate file
  // inside the validation folder
  if (!username || !password)
    throw createError.BadRequest('username and password are required');

  const findUser = await getUserByUsername(username);

  if (!findUser)
    throw createError.Unauthorized('username or password is incorrect');

  const match = await bcrypt.compare(password, findUser.password);

  if (!match)
    throw createError.Unauthorized('username or password is incorrect');

  // create token
  const token = jwt.sign(
    { id: findUser.id, username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1h',
    }
  );

  return { token };
}

export { userLogin };
