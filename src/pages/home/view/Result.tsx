import { useCallback, useEffect, useState } from 'react'
import { Analytics, ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import {
  apiStudent,
  apiUser,
  iAction,
  useAppThemeContext,
  useAuthContext,
  usePaginationContext,
  useParamsContext,
} from '../../../shared'
import { DialogResult, TableResult } from '../components'

interface iResultProps {
  is_block?: boolean
}

export const Result = ({ is_block }: iResultProps) => {
  const { theme } = useAppThemeContext()
  const { userProfile } = useAuthContext()
  const { setCount } = usePaginationContext()
  const { setIsLoading } = useParamsContext()
  const [listData, setlistData] = useState<iAction[]>([])
  const [resultData, setResultData] = useState<iAction>()

  const handleResult = (newResult: iAction) => setResultData(newResult)

  const onClose = () => setResultData(undefined)

  const getUser = useCallback(() => {
    if (is_block) {
      setIsLoading(true)
      apiUser
        .actions()
        .then((res) => {
          setlistData(res.result)
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    } else if (userProfile?.record_id) {
      setIsLoading(true)
      apiStudent
        .actions(userProfile.record_id)
        .then((res) => {
          setlistData(res.result)
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    }
  }, [is_block, userProfile])

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      {is_block ? (
        <Grid item xs={12} md={9}>
          <Box component={Paper}>
            <Box
              height={theme.spacing(7)}
              width="100%"
              display="flex"
              alignItems="center"
              p={1}
            >
              <Typography
                component="div"
                variant="h6"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <Analytics />
                Histórico
              </Typography>
            </Box>
            <Divider />
            <Box p={1}>
              <TableResult listData={listData} handleResult={handleResult} />
            </Box>
          </Box>
        </Grid>
      ) : (
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
      )}
      {resultData && (
        <DialogResult open={true} onClose={onClose} data={resultData} />
      )}
    </>
  )
}
