import 'reflect-metadata';
import express, { type Express } from 'express';
import { userRouter } from './routes';

const app: Express = express();
app.use(express.json());

//routes
app.use("/user", userRouter);

export { app };