import { z } from 'zod'
import {
  iClass,
  iClassFreq,
  iDataBase,
  iStatus,
  recordUpdateSchema,
  studentRemoveSchema,
  studentTransferSchema,
} from '../../shared'

export type iShift = 'MORNING' | 'AFTERNOON' | 'NIGHT' | 'FULL'

export interface iStudentBase {
  id: string
  name: string
  registry: string
  class: iDataBase
  school: iDataBase
}

export interface iStudent extends iStudentBase {
  year_id: string
  key: string
}

export interface iStudentResume extends iStudentBase {
  frequencies: number
  infrequency: number
  absences: number
}

export interface iStudentClass {
  student: {
    id: string
    name: string
    registry: string
  }
}

export interface iStudentList extends iStudent {
  classes?: { class: iClassFreq }[]
}

export interface iStudentFrequency extends iStudent {
  frequencies: {
    presented: number
    justified: number
    missed: number
    total: number
  }
  infrequency: number
}

export interface iStudentDash extends iStudentFrequency {
  class: iClass
}

export interface iRecord {
  key: string
  status: iStatus
  course: string
  semester: number
  total: number
  shift: iShift
  school: iDataBase
}

export type iStudentRemoveRequest = z.infer<typeof studentRemoveSchema>

export type iStudentTransferRequest = z.infer<typeof studentTransferSchema>

export type iRecordUpdateRequest = z.infer<typeof recordUpdateSchema>
