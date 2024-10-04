import { UserRepositoryInterface, UserRepository } from "@/repositories";
import { UserServiceInterface, UserService } from "@/services"
import { container } from "tsyringe";

container.register<UserRepositoryInterface>('UserRepository', { useClass: UserRepository });
container.register<UserServiceInterface>('UserService', { useClass: UserService });