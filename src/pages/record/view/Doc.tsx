import { Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardContent, Chip } from '@mui/material'
import { PermMedia } from '@mui/icons-material'
import {
  Footer,
  LayoutBasePage,
  TitleBaseItemsPage,
  Tools,
  LabelRecord,
  iDocument,
  apiRecord,
  useAppThemeContext,
  iDocumentID,
} from '../../../shared'
import { TabsRecordRetrievePage, DisplayImage, DocFt } from '../components'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

export const ViewDocRecordPage = () => {
  const { record_id, view } = useParams()
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
    if (record_id) getDocs(record_id)
  }, [record_id])

  if (!record_id) return <Navigate to="/" />

  return (
    <LayoutBasePage
      title={
        <TitleBaseItemsPage>
          <LabelRecord clickable />
          <Chip
            color="primary"
            label="Documentos"
            icon={<PermMedia sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBaseItemsPage>
      }
      tools={<Tools isBack />}
    >
      <TabsRecordRetrievePage value={view} />
      <Card>
        <CardContent>
          <DisplayImage record_id={record_id} document={ftData} title="Foto" />
          <DocFt
            record_id={record_id}
            docID={docIDData}
            title="Documento de Identificação com Foto"
          />
          <DisplayImage
            record_id={record_id}
            document={endData}
            title="Comprovante de Endereço"
          />
          <DisplayImage
            record_id={record_id}
            document={mtData}
            title="Declaração da Instituição de Ensino ou Atestado de Matrícula"
          />
        </CardContent>
      </Card>
      <Footer />
    </LayoutBasePage>
  )
}
