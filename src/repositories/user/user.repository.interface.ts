import { User } from '@prisma/client';

export interface UserRepositoryInterface {
  createUser(name: string, email: string, password: string): Promise<User>
  readUserByEmail(email: string): Promise<User | null>
  readUserByEmailAndPassword(email: string, password: string): Promise<User | null>
  readUserById(id: string): Promise<User | null>
}