import { lockerItemDeleteService } from '../service/lockerItemDelete.service';

// TODO: implement delete multiple items
async function lockerItemDelete(id: Number) {
  await lockerItemDeleteService(id);

  return { message: 'Item deleted successfully' };
}

export { lockerItemDelete };
