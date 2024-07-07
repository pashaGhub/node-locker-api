import { Router } from 'express';
import { lockerItemGetByUser } from '../controller/lockerItemGetByUser';
import { lockerItemCreate } from '../controller/lockerItemCreate';
import { lockerItemDelete } from '../controller/lockerItemDelete';
import { verifyJWT } from '../middleware/verifyJWT';
import { verifyLockerItemAccess } from '../middleware/verifyLockerItemAccess';

const router = Router();

// TODO: create a route to get single item by id
// TODO: create a route to update an item

router.get('/', verifyJWT, async (req, res, next) => {
  try {
    const result = await lockerItemGetByUser(req.user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/', verifyJWT, async (req, res, next) => {
  try {
    console.log(req.user.id);
    const result = await lockerItemCreate({
      user_id: req.user.id,
      ...req.body,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.delete(
  '/:id',
  verifyJWT,
  verifyLockerItemAccess,
  async (req, res, next) => {
    try {
      const result = await lockerItemDelete(Number(req.params.id));
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
