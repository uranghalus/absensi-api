/* eslint-disable @typescript-eslint/comma-dangle */
import { NextFunction, Request, Response } from 'express';
import { findUserById } from '../services/user-services';

const profileController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.payload as any;
    const user = await findUserById(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
export { profileController };
