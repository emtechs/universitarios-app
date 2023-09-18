import { apiUsingNow } from './api'

const create = async (
  data: FormData,
  user_id: string,
  query: string,
): Promise<void> => {
  await apiUsingNow.post(`images/user/${user_id}${query}`, data)
}

export const apiImage = { create }
