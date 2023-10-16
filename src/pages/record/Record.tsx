import { z } from 'zod'
import { Outlet, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { FolderShared } from '@mui/icons-material'
import { Chip } from '@mui/material'
import {
  LayoutBasePage,
  TitleBasePage,
  Footer,
  Tools,
  usePaginationContext,
  useParamsContext,
  iRecord,
  apiRecord,
  useDebounce,
  PaginationTable,
  useVerifyRecord,
} from '../../shared'
import { TabsRecordPage } from './components'
import { ViewRecordPage } from './view'

export const RecordPage = () => {
  const { record_id } = useParams()
  const { debounce } = useDebounce()
  const { verifyRecord } = useVerifyRecord()
  const { setIsLoading, search } = useParamsContext()
  const { setCount, setFace, query_page, handleFace, face } =
    usePaginationContext()
  const [requestData, setRequestData] = useState<iRecord[]>([])

  const getRecord = useCallback((query: string, isFace?: boolean) => {
    setIsLoading(true)
    if (isFace) {
      apiRecord
        .list(query)
        .then((res) => setRequestData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false))
    } else {
      apiRecord
        .list(query)
        .then((res) => {
          setFace(1)
          setRequestData(res.result)
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    }
  }, [])

  const define_query = useCallback(
    (comp: string) => {
      const query = '?by=asc' + comp + query_page()

      if (record_id) return `${query}&status=${record_id}`

      return query
    },
    [query_page, record_id],
  )

  const onClick = () => getRecord(define_query(handleFace(face)), true)

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getRecord(define_query(query_data))
      })
    } else getRecord(define_query(query_data))
  }, [define_query, search])

  useEffect(() => {
    if (record_id && z.string().uuid().safeParse(record_id).success)
      verifyRecord(record_id)
  }, [record_id])

  if (z.string().uuid().safeParse(record_id).success) return <Outlet />

  return (
    <LayoutBasePage
      title={
        <TitleBasePage>
          <Chip
            label="Registros"
            color="primary"
            icon={<FolderShared sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBasePage>
      }
      tools={<Tools isHome isReset isSearch />}
    >
      <TabsRecordPage value={record_id} />
      <ViewRecordPage listData={requestData} />
      <PaginationTable
        total={requestData ? requestData.length : 0}
        onClick={onClick}
      />
      <Footer />
    </LayoutBasePage>
  )
}
