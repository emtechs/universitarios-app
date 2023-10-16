import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardContent, Chip, Typography } from '@mui/material'
import { History } from '@mui/icons-material'
import {
  Footer,
  LayoutBasePage,
  TitleBaseItemsPage,
  Tools,
  LabelRecord,
  apiRecord,
  iAction,
  usePaginationContext,
  useParamsContext,
  BaseContentChildren,
  DialogBaseChildren,
} from '../../../shared'
import { TableResult, TabsRecordRetrievePage } from '../components'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

export const ViewHistoryRecordPage = () => {
  const { record_id, view } = useParams()
  const { setCount } = usePaginationContext()
  const { setIsLoading } = useParamsContext()
  const [listData, setlistData] = useState<iAction[]>([])
  const [resultData, setResultData] = useState<iAction>()

  const handleResult = (newResult: iAction) => setResultData(newResult)

  const onClose = () => setResultData(undefined)

  const getUser = (id: string) => {
    setIsLoading(true)
    apiRecord
      .actions(id)
      .then((res) => {
        setlistData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (record_id) getUser(record_id)
  }, [record_id])

  return (
    <>
      <LayoutBasePage
        title={
          <TitleBaseItemsPage>
            <LabelRecord clickable />
            <Chip
              color="primary"
              label="Histórico"
              icon={<History sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleBaseItemsPage>
        }
        tools={<Tools isBack />}
      >
        <TabsRecordRetrievePage value={view} />
        <Card>
          <CardContent>
            <TableResult listData={listData} handleResult={handleResult} />
          </CardContent>
        </Card>
        <Footer />
      </LayoutBasePage>
      {resultData && (
        <DialogBaseChildren
          open={true}
          onClose={onClose}
          title="Histórico Detalhado"
          description=""
        >
          <BaseContentChildren>
            <Typography>
              {dayjs(resultData.created_at).format('LLLL')}
            </Typography>
            <Typography>{resultData.description}</Typography>
            <Typography>{resultData.justification}</Typography>
            <Typography>{resultData.user.name}</Typography>
          </BaseContentChildren>
        </DialogBaseChildren>
      )}
    </>
  )
}
