import express from 'express';
import { isAuthenticated } from '../../middlewares';
import { profileController } from '../../controllers/user.controller';

const UserRouter = express.Router();
UserRouter.get('/profile', isAuthenticated, profileController);
export { UserRouter };
