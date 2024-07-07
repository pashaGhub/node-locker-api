import { Router } from 'express';
import { db } from '../db/connection';
import { userRegister } from '../controller/userRegister';
import { userLogin } from '../controller/userLogin';

const router = Router();

// this route is only for demo purposes and should be removed in production
router.get('/users', async (req, res, next) => {
  try {
    const result = await db.all('SELECT * FROM users');
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const result = await userRegister(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const token = await userLogin(req.body);
    res.json(token);
  } catch (err) {
    next(err);
  }
});

export default router;
