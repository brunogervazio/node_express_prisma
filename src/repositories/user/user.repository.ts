import { UserRepositoryInterface } from "@/interfaces"
import { decrypt } from "@/common/security/encryption";
import { User } from '@prisma/client';
import { PrismaClient } from "@prisma/client";

export class UserRepository implements UserRepositoryInterface {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async readUserById(id: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    this.prisma.$disconnect()
    return result
  }

  async readUserByEmail(email: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    this.prisma.$disconnect()
    return result
  }

  async readUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    this.prisma.$disconnect()
    return result && decrypt(result.password) === password ? result : null
  }

  async createUser(name: string, email: string, password: string): Promise<User> {

    const result = await this.prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })

    this.prisma.$disconnect()
    return result
  }
}