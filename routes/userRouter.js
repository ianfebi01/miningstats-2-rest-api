import express from 'express';
import { refreshToken } from '../controller/RefreshToken.js';
import {
  getAllUser,
  Login,
  Logout,
  Register,
} from '../controller/userController.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const userRouter = express.Router();

userRouter.get('/', verifyToken, getAllUser);
userRouter.post('/register', Register);
userRouter.post('/login', Login);
userRouter.get('/token', refreshToken);
userRouter.delete('/logout', Logout);

export default userRouter;
