import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import { AuthRouter } from './routes/auth-routes';
import { UserRouter } from './routes/user-routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
export default router;
