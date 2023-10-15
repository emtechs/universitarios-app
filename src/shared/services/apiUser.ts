import { FieldValues } from 'react-hook-form'
import { apiUsingNow } from './api'
import {
  iAction,
  iDocument,
  iPeriod,
  iRecord,
  iSchool,
  iSchoolServer,
  iUser,
  iUserProfile,
  iWorkSchool,
} from '../interfaces'

interface iActionsReturn {
  total: number
  result: iAction[]
}

const actions = async (): Promise<iActionsReturn> => {
  const { data: response } =
    await apiUsingNow.get<iActionsReturn>('users/actions')
  return response
}

const create = async (
  data: FieldValues,
  queryData?: string,
): Promise<iUser> => {
  const query = queryData || ''
  const { data: response } = await apiUsingNow.post<iUser>(
    'users' + query,
    data,
  )
  return response
}

const createServer = async (
  data: FieldValues,
  school_id: string,
): Promise<iSchoolServer> => {
  const { data: response } = await apiUsingNow.post<iSchoolServer>(
    `users?school_id=${school_id}`,
    data,
  )
  return response
}

const retrieve = async (id: string, query: string): Promise<iUser> => {
  const { data: response } = await apiUsingNow.get<iUser>(`users/${id}${query}`)
  return response
}

interface iDocumentsReturn {
  foto: iDocument
  matricula: iDocument
  doc_ft_frente: iDocument
  doc_ft_verso: iDocument
  end: iDocument
  is_pending: boolean
}

const documents = async (id: string): Promise<iDocumentsReturn> => {
  const { data: response } = await apiUsingNow.get<iDocumentsReturn>(
    `users/documents/${id}`,
  )
  return response
}

const pending = async (id: string): Promise<boolean> => {
  const { data: response } = await apiUsingNow.get<boolean>(
    `users/pending/${id}`,
  )
  return response
}

interface iPageReturn {
  user: iUser
  periods: iPeriod[]
  period: iPeriod
}

const page = async (query: string): Promise<iPageReturn> => {
  const { data: response } = await apiUsingNow.get<iPageReturn>(
    `users/page${query}`,
  )
  return response
}

const profile = async (token: string, query: string): Promise<iUserProfile> => {
  const { data: response } = await apiUsingNow.get<iUserProfile>(
    `users/profile${query}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  return response
}

const record = async (id: string): Promise<iRecord> => {
  const { data: response } = await apiUsingNow.get<iRecord>(
    `users/record/${id}`,
  )
  return response
}

const refresh = async (query: string): Promise<iUserProfile> => {
  const { data: response } = await apiUsingNow.get<iUserProfile>(
    `users/profile${query}`,
  )
  return response
}

interface iListReturn {
  total: number
  result: iUser[]
}

const list = async (query: string): Promise<iListReturn> => {
  const { data: response } = await apiUsingNow.get<iListReturn>(`users${query}`)
  return response
}

const update = async (id: string, data: FieldValues): Promise<iUser> => {
  const { data: response } = await apiUsingNow.patch<iUser>(`users/${id}`, data)
  return response
}

const updateAuth = async (data: FieldValues): Promise<iUser> => {
  const { data: response } = await apiUsingNow.patch<iUser>('users', data)
  return response
}

interface iSchoolReturn {
  schools: iSchool[]
  total: number
  result: iWorkSchool[]
}

const schools = async (query: string) => {
  const { data: response } = await apiUsingNow.get<iSchoolReturn>(
    `users/schools${query}`,
  )
  return response
}

const destroy = async (login: string) => {
  await apiUsingNow.delete(`users/${login}`)
}

export const apiUser = {
  actions,
  create,
  createServer,
  page,
  profile,
  refresh,
  update,
  schools,
  retrieve,
  list,
  destroy,
  documents,
  record,
  updateAuth,
  pending,
}
