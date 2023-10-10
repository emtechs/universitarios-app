import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { PermMedia } from '@mui/icons-material'
import {
  apiUser,
  iDocument,
  useAppThemeContext,
  useAuthContext,
} from '../../../shared'
import { useState, useEffect } from 'react'
import { DisplayImage } from '../components'

export const Documents = () => {
  const { theme } = useAppThemeContext()
  const { userProfile } = useAuthContext()
  const [ftData, setFtData] = useState<iDocument>()
  const [mtData, setMtData] = useState<iDocument>()

  const getUser = () => {
    if (userProfile)
      apiUser.documents(userProfile.record_id).then((res) => {
        setFtData(res.foto)
        setMtData(res.matricula)
      })
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Grid item xs={12} md={5}>
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
            <PermMedia />
            Documentos
          </Typography>
        </Box>
        <Divider />
        <Box p={1}>
          <DisplayImage document={ftData} title="Foto" />
          <DisplayImage
            document={mtData}
            title="Declaração da Instituição de Ensino ou Atestado de Matrícula"
          />
        </Box>
      </Box>
    </Grid>
  )
}
