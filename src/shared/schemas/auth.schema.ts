import { z } from 'zod'
import { imageSchema } from './file.schema'

export const authSchema = z.object({
  login: z
    .string({ required_error: 'CPF obrigatório' })
    .min(11, 'Precisa ter 11 números'),
})

export const recoverySchema = z.object({
  login: z
    .string({ required_error: 'Usuário obrigatório' })
    .min(11, 'Precisa ter 11 números'),
})

export const passwordVerifySchema = z.object({
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .nonempty('Senha obrigatória'),
})

export const loginSchema = recoverySchema.extend({
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(1, 'Senha obrigatória'),
})

export const registerSchema = authSchema
  .extend({
    avatar: imageSchema,
    name: z
      .string({ required_error: 'Nome completo obrigatório' })
      .min(1, 'Nome completo obrigatório'),
    email: z
      .string({ required_error: 'Email obrigatório' })
      .email('Email inválido'),
    password: z
      .string({ required_error: 'Senha obrigatória' })
      .min(1, 'Senha obrigatória'),
    repeat_password: z
      .string({ required_error: 'Confirmar senha obrigatória' })
      .min(1, 'Confirmar senha obrigatória'),
    cpf: z.string().optional(),
  })
  .refine((fields) => fields.password === fields.repeat_password, {
    path: ['repeat_password'],
    message: 'As senhas precisam ser iguais',
  })
  .refine(
    (fields) =>
      (fields.cpf = fields.login.replace(
        /^(\d{3})(\d{3})(\d{3})(\d)/,
        '$1.$2.$3-$4',
      )),
  )
