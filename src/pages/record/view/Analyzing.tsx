import { Box, Chip, Grid, Paper, Typography } from '@mui/material'
import { Sync } from '@mui/icons-material'
import { Navigate } from 'react-router-dom'
import {
  Footer,
  LabelRecord,
  LayoutBasePage,
  TitleBaseItemsPage,
  apiRecord,
  iDocument,
  iDocumentID,
  shiftPtBr,
  useAppThemeContext,
  useStudentContext,
} from '../../../shared'
import { useState, useEffect } from 'react'
import { DisplayImage, DocFt } from '../components'

export const ViewAnalyzingRecordPage = () => {
  const { recordRetrieve } = useStudentContext()
  const { setLoading } = useAppThemeContext()
  const [ftData, setFtData] = useState<iDocument>()
  const [mtData, setMtData] = useState<iDocument>()
  const [docIDData, setDocIDData] = useState<iDocumentID>()
  const [endData, setEndData] = useState<iDocument>()

  const getDocs = (id: string) => {
    setLoading(true)
    apiRecord
      .documents(id)
      .then((res) => {
        setFtData(res.foto)
        setMtData(res.matricula)
        setDocIDData(res.doc_id)
        setEndData(res.end)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (recordRetrieve?.key) getDocs(recordRetrieve.key)
  }, [recordRetrieve])

  if (!recordRetrieve) return <Navigate to="/" />

  const getData = () => getDocs(recordRetrieve.key)

  return (
    <LayoutBasePage
      title={
        <TitleBaseItemsPage>
          <LabelRecord clickable />
          <Chip
            color="primary"
            label="Analizar"
            icon={<Sync sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBaseItemsPage>
      }
    >
      <Box
        m={2}
        display="flex"
        flexDirection="column"
        component={Paper}
        variant="outlined"
      >
        <Grid
          container
          direction="row"
          p={2}
          spacing={2}
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Typography textAlign="center">
              {recordRetrieve.user.name.toUpperCase()} -{' '}
              {recordRetrieve.user.cpf} - {recordRetrieve.school.name} -{' '}
              {recordRetrieve.course} - {recordRetrieve.semester}/
              {recordRetrieve.total} - {shiftPtBr(recordRetrieve.shift)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <DisplayImage
              record_id={recordRetrieve.key}
              document={ftData}
              title="Foto"
              is_analyzing
              getData={getData}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DocFt
              record_id={recordRetrieve.key}
              docID={docIDData}
              title="Documento de Identificação com Foto"
              is_analyzing
              getData={getData}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DisplayImage
              record_id={recordRetrieve.key}
              document={endData}
              title="Comprovante de Endereço"
              is_analyzing
              getData={getData}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DisplayImage
              record_id={recordRetrieve.key}
              document={mtData}
              title="Declaração da Instituição de Ensino ou Atestado de Matrícula"
              is_analyzing
              getData={getData}
            />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </LayoutBasePage>
  )
}
