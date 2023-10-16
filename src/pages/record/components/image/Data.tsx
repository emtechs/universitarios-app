import { useState } from 'react'
import { Loupe } from '@mui/icons-material'
import {
  AccordionDetails,
  Tooltip,
  IconButton,
  Avatar,
  Box,
  Typography,
} from '@mui/material'
import {
  iDocument,
  DialogBaseChildren,
  BaseContentChildren,
} from '../../../../shared'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

interface iDataProps {
  document: iDocument
  title: string
}

export const Data = ({ document, title }: iDataProps) => {
  const [open, setOpen] = useState(false)
  const [openResult, setOpenResult] = useState(false)
  const onClose = () => setOpen((old) => !old)
  const onCloseResult = () => setOpenResult((old) => !old)

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
          </Typography>
        </Box>
      </AccordionDetails>
      <DialogBaseChildren
        open={open}
        onClose={onClose}
        description=""
        title={`Visualizar ${title}`}
      >
        <img src={document.image.url} alt={title} />
      </DialogBaseChildren>
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
    </>
  )
}
