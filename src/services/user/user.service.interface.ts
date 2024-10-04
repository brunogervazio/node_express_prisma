import { ServiceResponse } from "@/common/models/service.response"
import { AuthUserRequest, AuthUserResponse } from "./dtos/auth.user"
import { CreateUserRequest } from "./dtos/create.user"
import { UserResponse } from "./dtos/user"

export interface UserServiceInterface {
  createUser(user: CreateUserRequest): Promise<ServiceResponse<UserResponse | null>>
  authUser(user: AuthUserRequest): Promise<ServiceResponse<AuthUserResponse | null>>
  readUser(id: string): Promise<ServiceResponse<UserResponse | null>>
}