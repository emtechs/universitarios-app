import { z } from 'zod'
import {
  authSchema,
  loginSchema,
  passwordRecoverySchema,
  recoverySchema,
  registerSchema,
} from '../schemas'

export type iAuthRequest = z.infer<typeof authSchema>

export type iRegisterRequest = z.infer<typeof registerSchema>

export type iLoginRequest = z.infer<typeof loginSchema>

export interface iLoginResponse {
  token: string
}

export type iRecoveryRequest = z.infer<typeof recoverySchema>

export type iRecoveryPasswordRequest = z.infer<typeof passwordRecoverySchema>
