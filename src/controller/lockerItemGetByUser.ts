import { lockerItemGetByUserService } from '../service/lockerItemGetByUser.service';

async function lockerItemGetByUser(id: string) {
  const result = await lockerItemGetByUserService(id);

  return result;
}

export { lockerItemGetByUser };
