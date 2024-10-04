import express, { type Router } from "express";
import { UserController } from '@/controllers/users.controller';
import { container } from "tsyringe";
import { checkToken } from "@/common/security/jwt";

export const userRouter: Router = express.Router();

const userController = container.resolve(UserController);

userRouter.post("/", userController.createUser);
userRouter.post("/auth", userController.authUser);

userRouter.all("*", checkToken);

userRouter.get("/:id", userController.readUser);