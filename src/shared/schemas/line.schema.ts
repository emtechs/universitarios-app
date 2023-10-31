import { z } from 'zod'

export const lineCreateSchema = z
  .object({
    shift: z.enum(['MORNING', 'AFTERNOON', 'NIGHT', 'FULL'], {
      required_error: 'Turno obrigatório',
    }),
    line: z.object(
      { id: z.string().uuid() },
      { required_error: 'Rota obrigatório' },
    ),
    line_id: z.string().uuid().optional(),
  })
  .refine((field) => (field.line_id = field.line.id))
