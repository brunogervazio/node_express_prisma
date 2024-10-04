import z from 'zod'

export const AuthUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const AuthUserResponseSchema = z.object({
  token: z.string()
})

export type AuthUserRequest = z.infer<typeof AuthUserRequestSchema>
export type AuthUserResponse = z.infer<typeof AuthUserResponseSchema>