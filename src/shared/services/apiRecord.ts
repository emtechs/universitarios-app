import { FieldValues } from 'react-hook-form'
import {
  iAction,
  iDocument,
  iDocumentID,
  iRecord,
  iStatus,
} from '../interfaces'
import { apiUsingNow } from './api'

interface iActionsReturn {
  total: number
  result: iAction[]
}

const actions = async (record_id: string): Promise<iActionsReturn> => {
  const { data: response } = await apiUsingNow.get<iActionsReturn>(
    `records/${record_id}/actions`,
  )
  return response
}

interface iDocumentsReturn {
  foto: iDocument
  matricula: iDocument
  doc_id: iDocumentID
  end: iDocument
  is_pending: boolean
}

const documents = async (record_id: string): Promise<iDocumentsReturn> => {
  const { data: response } = await apiUsingNow.get<iDocumentsReturn>(
    `records/${record_id}/documents`,
  )
  return response
}

interface iPendingReturn {
  is_pending: boolean
  status: iStatus
}

const pending = async (record_id: string): Promise<iPendingReturn> => {
  const { data: response } = await apiUsingNow.get<iPendingReturn>(
    `records/${record_id}/pending`,
  )
  return response
}

const retrieve = async (key: string): Promise<iRecord> => {
  const { data: response } = await apiUsingNow.get<iRecord>(`records/${key}`)
  return response
}

const update = async (data: FieldValues, key: string): Promise<iRecord> => {
  const { data: response } = await apiUsingNow.patch<iRecord>(
    `records/${key}`,
    data,
  )
  return response
}

const updateStatus = async (
  data: FieldValues,
  key: string,
  query: string,
): Promise<iRecord> => {
  const { data: response } = await apiUsingNow.patch<iRecord>(
    `records/${key}/status${query}`,
    data,
  )
  return response
}

interface iListReturn {
  total: number
  result: iRecord[]
}

const list = async (query: string): Promise<iListReturn> => {
  const { data: response } = await apiUsingNow.get<iListReturn>(
    `records${query}`,
  )
  return response
}

export const apiRecord = {
  actions,
  update,
  list,
  updateStatus,
  retrieve,
  documents,
  pending,
}
