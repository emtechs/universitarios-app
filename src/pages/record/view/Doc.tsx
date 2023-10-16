import { useParams } from 'react-router-dom'
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
  const [docFtData, setDocFtData] = useState<iDocument>()
  const [docFtBData, setDocFtBData] = useState<iDocument>()
  const [endData, setEndData] = useState<iDocument>()

  const getDocs = (id: string) => {
    setLoading(true)
    apiRecord
      .documents(id)
      .then((res) => {
        setFtData(res.foto)
        setMtData(res.matricula)
        setDocFtData(res.doc_ft_frente)
        setDocFtBData(res.doc_ft_verso)
        setEndData(res.end)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (record_id) getDocs(record_id)
  }, [record_id])

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
          <DisplayImage category="FT" document={ftData} title="Foto" />
          <DocFt
            frente={docFtData}
            verso={docFtBData}
            title="Documento de Identificação com Foto"
          />
          <DisplayImage
            category="END"
            document={endData}
            title="Comprovante de Endereço"
          />
          <DisplayImage
            category="MAT"
            document={mtData}
            title="Declaração da Instituição de Ensino ou Atestado de Matrícula"
          />
        </CardContent>
      </Card>
      <Footer />
    </LayoutBasePage>
  )
}
