import { UserService, UserServiceInterface } from "@/services";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { handleServiceResponse } from "@/common/utils/http.handlers";

@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserServiceInterface) { }

  public createUser = async (req: Request, res: Response) => {
    const result = await this.userService.createUser(req.body)
    return handleServiceResponse(result, res)
  }

  public authUser = async (req: Request, res: Response) => {
    const result = await this.userService.authUser(req.body)
    return handleServiceResponse(result, res)
  }

  public readUser = async (req: Request, res: Response) => {
    const result = await this.userService.readUser(req.params.id)
    return handleServiceResponse(result, res)
  }
}