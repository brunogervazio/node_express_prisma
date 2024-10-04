import z from 'zod'

export const CreateUserResuestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  passwordConfirmation: z.string(),
})

export type CreateUserRequest = z.infer<typeof CreateUserResuestSchema>