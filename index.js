import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import incomeRouter from './routes/incomeRouter.js';
import costRouter from './routes/costRouter.js';
import userRouter from './routes/userRouter.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const { connection } = mongoose;

const app = express();
const port = 419;

mongoose.connect('mongodb://localhost:27017/miningstats');

const db = mongoose.connection;
db.on('error', () => console.error(error));
db.once('open', () => console.log('Connected'));

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use('/income', incomeRouter);
app.use('/cost', costRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log('App running on port : ', port));
