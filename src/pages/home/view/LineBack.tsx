import { useState, useEffect } from 'react'
import { KeyboardDoubleArrowLeft } from '@mui/icons-material'
import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import {
  apiRecord,
  iLine,
  useAppThemeContext,
  useAuthContext,
} from '../../../shared'
import { CardLine } from '../components'

export const LineBack = () => {
  const { theme } = useAppThemeContext()
  const { userProfile } = useAuthContext()
  const [lineData, setLineData] = useState<iLine>()

  const getLine = () => {
    if (userProfile?.record_id)
      apiRecord
        .line(
          userProfile.record_id,
          `?is_back=true&week=${new Date().getDay() + 1}`,
        )
        .then((res) => {
          setLineData(res)
        })
  }

  useEffect(() => {
    getLine()
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
            <KeyboardDoubleArrowLeft />
            Volta
          </Typography>
        </Box>
        <Divider />
        <Box p={1}>
          {userProfile?.record_id && (
            <CardLine
              line={lineData}
              record_id={userProfile.record_id}
              is_back
              getLine={getLine}
            />
          )}
        </Box>
      </Box>
    </Grid>
  )
}
