import { useState } from 'react'
import { Check, Close, Edit, Loupe } from '@mui/icons-material'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FieldValues,
  FormContainer,
  TextFieldElement,
} from 'react-hook-form-mui'
import {
  AccordionDetails,
  Tooltip,
  IconButton,
  Avatar,
  Box,
  Typography,
  Button,
} from '@mui/material'
import {
  iDocument,
  DialogBaseChildren,
  BaseContentChildren,
  recordDocUpdateSchema,
  useAppThemeContext,
  apiImage,
  apiRecord,
  useAuthContext,
} from '../../../../shared'
import { DialogImageAction } from '..'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
import { useNavigate } from 'react-router-dom'

dayjs.extend(localizedFormat)

interface iDataProps {
  document: iDocument
  record_id: string
  title: string
  is_analyzing?: boolean
  getData?: () => void
}

export const Data = ({
  document,
  record_id,
  title,
  getData,
  is_analyzing,
}: iDataProps) => {
  const navigate = useNavigate()
  const { profileUser } = useAuthContext()
  const { setLoading, handleError, handleSucess } = useAppThemeContext()
  const [open, setOpen] = useState(false)
  const [openResult, setOpenResult] = useState(false)
  const [openRefused, setOpenRefused] = useState(false)
  const onClose = () => setOpen((old) => !old)
  const onCloseResult = () => setOpenResult((old) => !old)
  const onCloseRefused = () => setOpenRefused((old) => !old)

  const refusedDoc = async (data: FieldValues) => {
    try {
      onCloseRefused()
      setLoading(true)
      await apiImage.updateStatus(document.id, {
        ...data,
        status: 'REFUSED',
        title,
      })
      const pending_data = await apiRecord.pending(record_id)
      if (!pending_data.is_pending) {
        await apiRecord.updateStatus(
          { status: pending_data.status },
          record_id,
          '',
        )
        profileUser()
        navigate('/')
      }
      handleSucess(`${title} recusado com sucesso`)
      getData && getData()
    } catch {
      handleError(`Não foi possível recursar ${title} no momento!`)
    } finally {
      setLoading(false)
    }
  }

  const confirmedDoc = async () => {
    try {
      setLoading(true)
      await apiImage.updateStatus(document.id, {
        status: 'CONFIRMED',
        title,
      })
      const pending_data = await apiRecord.pending(record_id)
      if (!pending_data.is_pending) {
        await apiRecord.updateStatus(
          { status: pending_data.status },
          record_id,
          '',
        )
        profileUser()
        navigate('/')
      }
      handleSucess(`${title} aprovado com sucesso`)
      getData && getData()
    } catch {
      handleError(`Não foi possível aprovar ${title} no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AccordionDetails
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Tooltip title={`Visualizar ${title}`}>
          <IconButton size="small" onClick={onClose}>
            <Avatar
              src={document.image.url}
              sx={{ width: '150px', height: '150px' }}
            />
          </IconButton>
        </Tooltip>
        <Box p={1}>
          <Typography>
            {document.action.description}{' '}
            <Tooltip title="Detalhes">
              <IconButton color="primary" onClick={onCloseResult}>
                <Loupe />
              </IconButton>
            </Tooltip>
            {is_analyzing && document.status === 'RECEIVED' && (
              <>
                <Tooltip title="Aprovar">
                  <IconButton color="success" onClick={confirmedDoc}>
                    <Check />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Recusar">
                  <IconButton color="error" onClick={onCloseRefused}>
                    <Close />
                  </IconButton>
                </Tooltip>
              </>
            )}
            {is_analyzing && document.status === 'CONFIRMED' && (
              <Tooltip title="Atualizar">
                <IconButton color="info" onClick={onCloseResult}>
                  <Edit />
                </IconButton>
              </Tooltip>
            )}
          </Typography>
        </Box>
      </AccordionDetails>
      {is_analyzing && document.status === 'RECEIVED' ? (
        <DialogImageAction
          open={open}
          onClose={onClose}
          description=""
          title={`Visualizar ${title}`}
          confirmed={confirmedDoc}
          refused={() => {
            onClose()
            onCloseRefused()
          }}
        >
          <img src={document.image.url} alt={title} />
        </DialogImageAction>
      ) : (
        <DialogBaseChildren
          open={open}
          onClose={onClose}
          description=""
          title={`Visualizar ${title}`}
        >
          <img src={document.image.url} alt={title} />
        </DialogBaseChildren>
      )}
      <DialogBaseChildren
        open={openResult}
        onClose={onCloseResult}
        title="Histórico Detalhado"
        description=""
      >
        <BaseContentChildren>
          <Typography>
            {dayjs(document.action.created_at).format('LLLL')}
          </Typography>
          <Typography>{document.action.description}</Typography>
          <Typography>{document.action.justification}</Typography>
          <Typography>{document.action.user.name}</Typography>
        </BaseContentChildren>
      </DialogBaseChildren>
      <DialogBaseChildren
        open={openRefused}
        onClose={onCloseRefused}
        title={`Recusar ${title}`}
        description={`Você optou por não aceitar ${title}.
      Por favor, forneça a justificativa para a recusa no campo abaixo.`}
      >
        <FormContainer
          onSuccess={refusedDoc}
          resolver={zodResolver(recordDocUpdateSchema)}
        >
          <Box mt={1} display="flex" flexDirection="column" gap={1}>
            <TextFieldElement
              name="justification"
              label="Justificativa"
              required
              fullWidth
              margin="dense"
            />
            <Button variant="contained" type="submit" fullWidth>
              Salvar
            </Button>
          </Box>
        </FormContainer>
      </DialogBaseChildren>
    </>
  )
}
