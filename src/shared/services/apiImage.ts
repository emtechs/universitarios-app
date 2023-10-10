import { apiUsingNow } from './api'

const create = async (
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

export const apiImage = { create, createUser, update }
