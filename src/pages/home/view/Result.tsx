import { useEffect, useState } from 'react'
import { Analytics, ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material'
import {
  apiStudent,
  iAction,
  useAuthContext,
  usePaginationContext,
  useParamsContext,
} from '../../../shared'
import { DialogResult, TableResult } from '../components'

export const Result = () => {
  const { userProfile } = useAuthContext()
  const { setCount } = usePaginationContext()
  const { setIsLoading } = useParamsContext()
  const [listData, setlistData] = useState<iAction[]>([])
  const [resultData, setResultData] = useState<iAction>()

  const handleResult = (newResult: iAction) => setResultData(newResult)

  const onClose = () => setResultData(undefined)

  const getUser = () => {
    if (userProfile?.record_id) {
      setIsLoading(true)
      apiStudent
        .actions(userProfile.record_id)
        .then((res) => {
          setlistData(res.result)
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography
              component="div"
              variant="subtitle1"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Analytics />
              Histórico
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableResult listData={listData} handleResult={handleResult} />
          </AccordionDetails>
        </Accordion>
      </Grid>
      {resultData && (
        <DialogResult open={true} onClose={onClose} data={resultData} />
      )}
    </>
  )
}
