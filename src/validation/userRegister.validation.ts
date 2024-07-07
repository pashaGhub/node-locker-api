import createError from 'http-errors';
import { IUser } from '../types';

function userRegisterValidation(user: IUser) {
  if (typeof user?.username !== 'string' || !user?.username?.trim())
    throw createError[400](
      'Username is required. Please check if it is string and provided.'
    );

  if (typeof user?.password !== 'string' || !user?.password?.trim())
    throw createError[400](
      'Password is required. Please check if it is string and provided.'
    );
}

export { userRegisterValidation };
