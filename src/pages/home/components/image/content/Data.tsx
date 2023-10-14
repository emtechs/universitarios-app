import { useState } from 'react'
import { Loupe, Warning } from '@mui/icons-material'
import {
  AccordionDetails,
  Tooltip,
  IconButton,
  Avatar,
  Box,
  Typography,
} from '@mui/material'
import { iDocument } from '../../../../../shared'
import { DialogImage, DialogResult, DialogUpload } from '../../dialog'

interface iDataProps {
  document: iDocument
  title: string
  getDocs: () => void
}

export const Data = ({ document, title, getDocs }: iDataProps) => {
  const [open, setOpen] = useState(false)
  const [openResult, setOpenResult] = useState(false)
  const [openImage, setOpenImage] = useState(false)

  const onClose = () => setOpen((old) => !old)
  const onCloseResult = () => setOpenResult((old) => !old)
  const onCloseImage = () => setOpenImage((old) => !old)

  return (
    <>
      <AccordionDetails
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Tooltip title={`Visualizar ${title}`}>
          <IconButton size="small" onClick={onClose}>
            <Avatar
              src={document?.image.url}
              sx={{ width: '150px', height: '150px' }}
            />
          </IconButton>
        </Tooltip>
        <Box p={1}>
          <Typography>
            {document?.action.description}{' '}
            <Tooltip title="Detalhes">
              <IconButton color="primary" onClick={onCloseResult}>
                <Loupe />
              </IconButton>
            </Tooltip>
            {document?.status === 'REFUSED' && (
              <Tooltip title="Resolver">
                <IconButton color="warning" onClick={onCloseImage}>
                  <Warning />
                </IconButton>
              </Tooltip>
            )}
          </Typography>
        </Box>
      </AccordionDetails>
      <DialogImage
        open={open}
        onClose={onClose}
        getDocs={getDocs}
        title={title}
        document={document}
      />
      <DialogResult
        open={openResult}
        onClose={onCloseResult}
        data={document.action}
      />
      <DialogUpload
        document={document}
        getDocs={getDocs}
        onClose={onCloseImage}
        onCloseImage={onCloseImage}
        open={openImage}
        title={title}
        is_pending
      />
    </>
  )
}
