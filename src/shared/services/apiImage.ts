import { FieldValues } from 'react-hook-form'
import { apiUsingNow } from './api'

const create = async (data: FormData, query: string): Promise<void> => {
  await apiUsingNow.post(`images/doc${query}`, data)
}

const profile = async (
  data: FormData,
  user_id: string,
  query: string,
): Promise<void> => {
  await apiUsingNow.post(`images/user/${user_id}${query}`, data)
}

const createUser = async (data: FormData): Promise<void> => {
  await apiUsingNow.post('images/user', data)
}

const update = async (id: string, data: FormData): Promise<void> => {
  await apiUsingNow.patch(`images/${id}`, data)
}

const updateStatus = async (id: string, data: FieldValues): Promise<void> => {
  await apiUsingNow.patch(`images/${id}/status`, data)
}

const destroyDoc = async (id: string): Promise<void> => {
  await apiUsingNow.delete(`images/doc/${id}`)
}

export const apiImage = {
  create,
  profile,
  createUser,
  update,
  updateStatus,
  destroyDoc,
}
