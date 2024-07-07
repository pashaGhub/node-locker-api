import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IDecoded {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

// add jwt user info to Request type
declare module 'express-serve-static-core' {
  interface Request {
    user: IDecoded;
  }
}

function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (Array.isArray(authHeader) || !authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'You are unauthorized' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded as IDecoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'You are unauthorized' });
  }
}

export { verifyJWT };
