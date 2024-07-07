import { ILockerItem } from '../types';
import { lockerItemCreateValidation } from '../validation/lockerItemCreate.validation';
import { lockerItemCreateService } from '../service/lockerItemCreate.service';

async function lockerItemCreate(item: ILockerItem) {
  lockerItemCreateValidation(item);

  const response = await lockerItemCreateService(item);

  return { message: 'Item created successfully', ...response };
}

export { lockerItemCreate };
