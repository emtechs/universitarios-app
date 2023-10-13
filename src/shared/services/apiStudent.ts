import { FieldValues } from 'react-hook-form'
import { iAction, iRecord, iStudent, iStudentResume } from '../interfaces'
import { apiUsingNow } from './api'

interface iActionsReturn {
  total: number
  result: iAction[]
}

const actions = async (record_id: string): Promise<iActionsReturn> => {
  const { data: response } = await apiUsingNow.get<iActionsReturn>(
    `students/actions/${record_id}`,
  )
  return response
}

const create = async (data: FieldValues, query?: string): Promise<iStudent> => {
  const { data: response } = await apiUsingNow.post<iStudent>(
    `students${query}`,
    data,
  )
  return response
}

interface iList {
  total: number
  result: iStudent[]
}

const list = async (query: string): Promise<iList> => {
  const { data: response } = await apiUsingNow.get<iList>(`students${query}`)
  return response
}

const listClass = async (query: string): Promise<iList> => {
  const { data: response } = await apiUsingNow.get<iList>(
    `students/class${query}`,
  )
  return response
}

const update = async (data: FieldValues, id: string): Promise<iStudent> => {
  const { data: response } = await apiUsingNow.patch<iStudent>(
    `students/${id}`,
    data,
  )
  return response
}

const updateInfreq = async (data: FieldValues): Promise<iStudent> => {
  const { data: response } = await apiUsingNow.patch<iStudent>(
    `/infrequency/student`,
    data,
  )
  return response
}

const updateRecord = async (
  data: FieldValues,
  key: string,
): Promise<iStudent> => {
  const { data: response } = await apiUsingNow.patch<iStudent>(
    `students/record/${key}`,
    data,
  )
  return response
}

const impStudent = async (
  data: FormData,
  class_id: string,
  school_id: string,
): Promise<void> => {
  await apiUsingNow.post(`imports/student/${class_id}/${school_id}`, data)
}

const impStudentAll = async (data: FormData): Promise<void> => {
  await apiUsingNow.post('imports/student', data)
}

interface iResume {
  total: number
  result: iStudentResume[]
}

const resume = async (year_id: string, query: string): Promise<iResume> => {
  const { data: response } = await apiUsingNow.get<iResume>(
    `students/resume/${year_id}${query}`,
  )
  return response
}

interface iRecords {
  total: number
  result: iRecord[]
}

const records = async (query: string): Promise<iRecords> => {
  const { data: response } = await apiUsingNow.get<iRecords>(
    `students/record${query}`,
  )
  return response
}

export const apiStudent = {
  actions,
  create,
  update,
  updateInfreq,
  updateRecord,
  impStudent,
  impStudentAll,
  list,
  listClass,
  resume,
  records,
}
