import { z } from 'zod'
import { imageSchema } from './file.schema'

export const studentSchema = z.object({
  name: z
    .string({ required_error: 'Nome obrigatório' })
    .min(1, 'Nome obrigatório'),
  registry: z
    .string({ required_error: 'Matricula obrigatória' })
    .min(1, 'Matricula obrigatória'),
})

export const recordUpdateSchema = z
  .object({
    avatar: imageSchema,
    course: z
      .string({ required_error: 'Curso obrigatório' })
      .min(1, 'Curso obrigatório'),
    semester: z
      .number({ required_error: 'Semestre Atual obrigatório' })
      .gte(1, 'Semestre Atual deve ser maior que zero'),
    total: z
      .number({ required_error: 'Total de Semestres obrigatório' })
      .gte(1, 'Total de Semestres deve ser maior que zero'),
    shift: z.enum(['MORNING', 'AFTERNOON', 'NIGHT', 'FULL'], {
      required_error: 'Turno obrigatório',
    }),
    school: z.object(
      { id: z.string().uuid() },
      { required_error: 'Instituição de Ensino obrigatório' },
    ),
    school_id: z.string().uuid().optional(),
  })
  .refine((fields) => (fields.school_id = fields.school.id))
  .refine((fields) => fields.semester <= fields.total, {
    path: ['semester'],
    message: 'Semestre Atual deve ser menor ou igual ao Total de Semestres',
  })
  .refine((fields) => fields.total >= fields.semester, {
    path: ['total'],
    message: 'Total de Semestres deve ser maior ou igual ao Semestre Atual',
  })

export const studentRemoveSchema = z
  .object({
    justify_disabled: z
      .string({ required_error: 'Justificativa obrigatório' })
      .min(1, 'Justificativa obrigatório'),
    finished_at: z.number().optional(),
  })
  .refine((fields) => (fields.finished_at = Date.now()))

export const studentTransferSchema = z
  .object({
    justify_disabled: z
      .string({ required_error: 'Justificativa obrigatório' })
      .min(1, 'Justificativa obrigatório'),
    finished_at: z.number().optional(),
    class: z.object(
      { id: z.string().uuid() },
      { required_error: 'Turma obrigatória' },
    ),
    school: z.object(
      { id: z.string().uuid() },
      { required_error: 'Escola obrigatório' },
    ),
    class_id: z.string().uuid().optional(),
    school_id: z.string().uuid().optional(),
    year_id: z.string().uuid(),
    student_id: z.string().uuid(),
    key: z.string().uuid(),
  })
  .refine((fields) => (fields.finished_at = Date.now()))
  .refine((fields) => (fields.class_id = fields.class.id))
  .refine((fields) => (fields.school_id = fields.school.id))

export const studentSchoolCreateSchema = studentSchema
  .extend({
    class: z.object(
      { id: z.string().uuid() },
      { required_error: 'Turma obrigatória' },
    ),
    class_id: z.string().uuid().optional(),
  })
  .refine((fields) => (fields.class_id = fields.class.id))

export const recordDocUpdateSchema = z.object({
  justification: z
    .string({ required_error: 'Justificativa obrigatória' })
    .min(1, 'Justificativa obrigatória'),
})
