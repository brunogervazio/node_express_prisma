import { UserRepository} from "@/repositories";
import { inject, injectable } from "tsyringe";
import { encrypt } from "@/common/security/encryption";
import { ServiceResponse } from "@/common/models/service.response";
import { StatusCodes } from "http-status-codes";
import { genToken } from '@/common/security/jwt'
import { UserServiceInterface } from "./user.service.interface";
import { UserRepositoryInterface } from "@/interfaces";
import { CreateUserRequest } from "./dtos/create.user";
import { AuthUserRequest, AuthUserResponse } from "./dtos/auth.user";
import { UserResponse } from "./dtos/user";

@injectable()
export class UserService implements UserServiceInterface {
  constructor(@inject(UserRepository) private userRepoository: UserRepositoryInterface) { }
  async readUser(id: string): Promise<ServiceResponse<UserResponse | null>> {
    try {
      const user = await this.userRepoository.readUserById(id)
      if (!user)
        throw new Error('User not found')

      return ServiceResponse.success<UserResponse>('User found', {
        id: user.id,
        email: user.email,
        name: user.name || ''
      })
    } catch (error) {
      return ServiceResponse.failure(
        (error as Error).message || 'Error to find user', null)
    }
  }

  async authUser(user: AuthUserRequest): Promise<ServiceResponse<AuthUserResponse | null>> {
    try {
      const userAuth = await this.userRepoository
        .readUserByEmailAndPassword(user.email, user.password)

      if (!userAuth)
        throw new Error('User or password incorrect')

      const token = genToken(userAuth)

      return ServiceResponse.success<AuthUserResponse>('User authenticated', { token: token })
    } catch (error) {
      return ServiceResponse.failure(
        (error as Error).message || 'Error authenticating user',
        null,
        StatusCodes.UNAUTHORIZED)
    }
  }

  async createUser(user: CreateUserRequest): Promise<ServiceResponse<UserResponse | null>> {
    try {
      if (await this.userRepoository.readUserByEmail(user.email))
        throw new Error('User already exists')

      if (user.password !== user.passwordConfirmation)
        throw new Error('Password and confirm password do not match')

      const createdUser = await this.userRepoository.createUser(
        user.name,
        user.email,
        encrypt(user.password))

      return ServiceResponse.success<UserResponse>('User created', {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name || ''
      })
    } catch (error) {
      return ServiceResponse.failure((error as Error).message || 'Error creating user', null)
    }
  }


}