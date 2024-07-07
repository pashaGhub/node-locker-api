import createError from 'http-errors';
import { ILockerItem } from '../types';

function lockerItemCreateValidation(item: ILockerItem) {
  if (typeof item?.name !== 'string' || !item?.name?.trim())
    throw createError(
      400,
      'Item name is required. Please check if it is string and provided.'
    );
}

export { lockerItemCreateValidation };
