import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material'
import { ExpandMore, Sync } from '@mui/icons-material'
import {
  useDialogContext,
  ButtonSmDown,
  useStudentContext,
  DialogBase,
  shiftPtBr,
  statusPtBr,
} from '../../../shared'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

export const ViewRetrieveRecordPage = () => {
  const { record_id } = useParams()
  const { recordDataRetrieve, loadingRecord, recordRetrieve } =
    useStudentContext()
  const { handleOpenActive, openActive } = useDialogContext()

  useEffect(() => {
    if (record_id) recordDataRetrieve(record_id)
  }, [record_id])

  return (
    <>
      <Card>
        <CardContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {loadingRecord ? (
                <Skeleton width={300} />
              ) : (
                <Typography>{recordRetrieve?.user.name}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {recordRetrieve?.period.name} -{' '}
                {recordRetrieve?.school.name.toUpperCase()} -{' '}
                {recordRetrieve?.course.toUpperCase()} -{' '}
                {recordRetrieve?.semester}/{recordRetrieve?.total} -{' '}
                {shiftPtBr(recordRetrieve?.shift)}
              </Typography>
              <Typography>
                Estado: {statusPtBr(recordRetrieve?.status)}
              </Typography>
              <Typography>
                Solicitado:{' '}
                {dayjs(recordRetrieve?.created_at).format('dddd, LL')}
              </Typography>
              <Typography>CPF: {recordRetrieve?.user.cpf}</Typography>
              {recordRetrieve?.analyst && (
                <Typography>
                  Responsável pela Análise: {recordRetrieve?.analyst.name} -{' '}
                  {recordRetrieve?.analyst.cpf}
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </CardContent>
        {recordRetrieve?.status === 'RECEIVED' && (
          <CardActions>
            <ButtonSmDown
              title="Analizar"
              color="warning"
              startIcon={<Sync />}
              onClick={handleOpenActive}
            />
          </CardActions>
        )}
      </Card>
      {recordRetrieve && (
        <DialogBase
          open={openActive}
          onClose={handleOpenActive}
          title="Analizar Registro"
          description={`Você está prestes a realizar a análise do registro do ${
            recordRetrieve.period.name
          } - ${recordRetrieve.user.name.toUpperCase()}. A responsabilidade de aprovar ou recusar o registro está exclusivamente em suas mãos. Se estiver seguro de sua decisão, clique em 'Continuar'.`}
          action={handleOpenActive}
          actionTitle="Continuar"
        />
      )}
    </>
  )
}
