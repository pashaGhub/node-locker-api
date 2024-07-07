import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { db } from '../db/connection';
import { IUser } from '../types';
import { userRegisterValidation } from '../validation/userRegister.validation';
import { getUserByUsername, registerNewUser } from '../service/user.service';

async function userRegister(user: IUser) {
  userRegisterValidation(user);

  // check if any user alread exists
  const userExists = await getUserByUsername(user.username);

  if (userExists) throw new createError.Conflict('User already exists');

  // hash password
  const hashedPwd = await bcrypt.hash(user.password, 10);

  await registerNewUser(user.username, hashedPwd);

  return { message: 'User created successfully' };
}

export { userRegister };
