import { useState, useEffect } from 'react'
import { PermMedia } from '@mui/icons-material'
import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import {
  apiUser,
  iDocument,
  iDocumentID,
  useAppThemeContext,
  useAuthContext,
} from '../../../shared'
import { DisplayImage } from '../components'
import { DocFt } from '../components/image/DocFt'

export const Documents = () => {
  const { theme } = useAppThemeContext()
  const { userProfile } = useAuthContext()
  const [ftData, setFtData] = useState<iDocument>()
  const [mtData, setMtData] = useState<iDocument>()
  const [docIDData, setDocIDData] = useState<iDocumentID>()
  const [endData, setEndData] = useState<iDocument>()

  const getDocs = () => {
    if (userProfile?.record_id)
      apiUser.documents(userProfile.record_id).then((res) => {
        setFtData(res.foto)
        setMtData(res.matricula)
        setDocIDData(res.doc_id)
        setEndData(res.end)
      })
  }

  useEffect(() => {
    getDocs()
  }, [])

  return (
    <Grid item xs={12} md={5} width="100%">
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
          <DisplayImage
            category="FT"
            document={ftData}
            title="Foto"
            getDocs={getDocs}
          />
          <DocFt
            docID={docIDData}
            title="Documento de Identificação com Foto"
            getDocs={getDocs}
          />
          <DisplayImage
            category="END"
            document={endData}
            title="Comprovante de Endereço"
            getDocs={getDocs}
          />
          <DisplayImage
            category="MAT"
            document={mtData}
            title="Declaração da Instituição de Ensino ou Atestado de Matrícula"
            getDocs={getDocs}
          />
        </Box>
      </Box>
    </Grid>
  )
}
