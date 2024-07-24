import express from 'express';
import { validateData } from '../../middlewares';
import { loginSchema, registerSchema } from '../../schema/userSchema';
import {
  loginController,
  registerController,
} from '../../controllers/auth.controllers';

const AuthRouter = express.Router();

AuthRouter.post('/register', validateData(registerSchema), registerController);
AuthRouter.post('/login', validateData(loginSchema), loginController);
export { AuthRouter };
