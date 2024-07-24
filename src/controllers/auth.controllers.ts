/* eslint-disable @typescript-eslint/comma-dangle */
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  createUserByEmailAndPassword,
  findUserByEmail,
} from '../services/user-services';
import { generateTokens } from '../utils/jwt';
import { addRefreshTokenToWhitelist } from '../services/auth-services';
import { comparePassword } from '../utils/password-utils';

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body as any;
    if (!email || !password) {
      res.status(400);
      res.send({ msg: 'You must provide an email and a password.' });
    }
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400);
      res.send({ msg: 'Email already registered' });
    }

    const user = await createUserByEmailAndPassword({ email, password, name });
    if (user) {
      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(user, jti);
      await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });
      res.send({
        user: user,
        accestoken: accessToken,
        refreshToken: refreshToken,
      });
    }
  } catch (error) {
    next(error);
  }
};
const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as any;
    if (!email || !password) {
      res.status(400);
      res.send({ msg: 'You must provide an email and a password.' });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(403);
      res.send({ msg: 'Email Not Found!.' });
    }
    const isPasswordCorrect = await comparePassword(
      password,
      user?.salt as any,
      user?.hash as any
    );
    if (isPasswordCorrect) {
      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(user, jti);
      await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user?.id });

      res.json({
        accessToken,
        refreshToken,
      });
    } else {
      res.status(403);
      res.send({ msg: 'Password Not Match!' });
    }
  } catch (error) {
    next(error);
  }
};
export { registerController, loginController };
