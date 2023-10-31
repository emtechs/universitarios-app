import { z } from 'zod'
import { iDataBase, iShift, lineCreateSchema } from '../../shared'

interface iWeek extends iDataBase {
  week: number
}

export interface iLine {
  id: string
  shift: iShift
  is_back: boolean
  route: iDataBase
  week: iWeek
}

export type iLineRequest = z.infer<typeof lineCreateSchema>
