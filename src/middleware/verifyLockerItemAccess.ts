import { Request, Response, NextFunction } from 'express';
import { db } from '../db/connection';
import { ILockerItem } from '../types';

async function verifyLockerItemAccess(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const itemId = req.params.id;
    const userId = req.user.id;

    const result = await db.get<ILockerItem>(
      'SELECT * FROM locker WHERE id = ?',
      [itemId]
    );

    // return 404 if item is not found
    if (!result) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (result.user_id !== userId) {
      return res.status(401).json({ message: 'You are unauthorized' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'You are unauthorized' });
  }
}

export { verifyLockerItemAccess };
