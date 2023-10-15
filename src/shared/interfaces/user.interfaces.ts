import { z } from 'zod'
import {
  createAdmSchema,
  createDirectorSchema,
  createSecretSchema,
  userFirstSchema,
  userPasswordSchema,
  userRgSchema,
  userUpdateSchema,
} from '../schemas'
import { iWorkSchool } from './school.interface'
import { iDialogDataProps } from './global.interfaces'
import { iAction } from '.'

export type iRole = 'ADMIN' | 'SERV' | 'DIRET' | 'SECRET'

export type iStatus =
  | 'CONFIRMED'
  | 'REFUSED'
  | 'ANALYZING'
  | 'PENDING'
  | 'BLOCKED'
  | 'RECEIVED'

export interface iUserBase {
  id: string
  name: string
  cpf: string
}

export interface iUserProfile {
  id: string
  name: string
  cpf: string
  email: string
  role: iRole
  is_super: boolean
  is_first_access: boolean
  is_block: boolean
  profile?: {
    url: string
  }
  is_pending: boolean
  record_id?: string
  period_id: string
  status?: iStatus
  is_open: boolean
  records: number
}

export interface iUser extends iUserProfile {
  login: string
  is_active: boolean
  created_at: Date
  frequencies: number
  work_school?: iWorkSchool
}

export interface iDialogUserProps extends iDialogDataProps {
  user: iUser
}

export interface iUserDash {
  countSchool: number
  countClass: number
  countStudent: number
  countFrequency: number
  countServer: number
  countNotClass: number
}

export interface iDiretor {
  id: string
  name: string
  cpf: string
}

export interface iServer extends iDiretor {
  role: iRole
}

export interface iDocument {
  id: string
  status: iStatus
  record_id: string
  image: {
    id: string
    url: string
  }
  action: iAction
}

export type iUserAdmRequest = z.infer<typeof createAdmSchema>

export type iUserDirectorRequest = z.infer<typeof createDirectorSchema>

export type iUserSecretRequest = z.infer<typeof createSecretSchema>

export type iUserFirstRequest = z.infer<typeof userFirstSchema>

export type iUserUpdateRequest = z.infer<typeof userUpdateSchema>

export type iUserPasswordRequest = z.infer<typeof userPasswordSchema>

export type iUserRgRequest = z.infer<typeof userRgSchema>
