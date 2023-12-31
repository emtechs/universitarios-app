import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { Article } from '@mui/icons-material'
import {
  ChildrenLoading,
  apiUser,
  iRecord,
  shiftPtBr,
  useAppThemeContext,
  useAuthContext,
} from '../../../shared'
import { useState, useEffect } from 'react'

export const Data = () => {
  const { mdDown, theme } = useAppThemeContext()
  const { userProfile } = useAuthContext()
  const [recordData, setRecordData] = useState<iRecord>()
  const [loading, setLoading] = useState(false)

  const getUser = () => {
    if (userProfile?.record_id) {
      setLoading(true)
      apiUser
        .record(userProfile.record_id)
        .then((res) => setRecordData(res))
        .finally(() => setLoading(false))
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Grid item xs={12} md={4} width="100%">
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
            <Article />
            Informações
          </Typography>
        </Box>
        <Divider />
        <Box
          p={1}
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap={0.5}
        >
          <ChildrenLoading isLoading={loading}>
            <Typography
              component="div"
              textAlign="center"
              height={mdDown ? theme.spacing(8) : theme.spacing(5)}
              fontWeight="bolder"
              variant="body1"
            >
              {recordData?.school.name.toUpperCase()}
            </Typography>
          </ChildrenLoading>
          <ChildrenLoading isLoading={loading}>
            <Typography variant="body2" textAlign="center">
              {recordData?.course.toUpperCase()} - {recordData?.semester}/
              {recordData?.total} - {shiftPtBr(recordData?.shift)}
            </Typography>
          </ChildrenLoading>
        </Box>
      </Box>
    </Grid>
  )
}
