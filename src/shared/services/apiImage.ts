import { apiUsingNow } from './api'

const create = async (data: FormData, user_id: string): Promise<void> => {
  await apiUsingNow.post(`images/user/${user_id}`, data)
}

const createUser = async (data: FormData): Promise<void> => {
  await apiUsingNow.post('images/user', data)
}

export const apiImage = { createUser, create }
