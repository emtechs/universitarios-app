import { useState } from 'react'
import { ExpandMore, Loupe, Warning } from '@mui/icons-material'
import {
  AccordionDetails,
  Tooltip,
  IconButton,
  Avatar,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
} from '@mui/material'
import { iDocument, useIconStatus } from '../../../shared'
import { DialogImage, DialogResult } from './dialog'
import { DialogUpload } from './dialog/Upload'

interface iDisplayImageProps {
  title: string
  getDocs: () => void
  document?: iDocument
}

export const DisplayImage = ({
  document,
  getDocs,
  title,
}: iDisplayImageProps) => {
  const { defineIconStatus } = useIconStatus()
  const [open, setOpen] = useState(false)
  const [openResult, setOpenResult] = useState(false)
  const [openImage, setOpenImage] = useState(false)

  const onClose = () => setOpen((old) => !old)
  const onCloseResult = () => setOpenResult((old) => !old)
  const onCloseImage = () => setOpenImage((old) => !old)

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography
            component="div"
            variant="subtitle1"
            display="flex"
            alignItems="center"
            gap={1}
          >
            {defineIconStatus(document?.status)}
            {title}
          </Typography>
        </AccordionSummary>
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
      </Accordion>
      <DialogImage
        open={open}
        onClose={onClose}
        getDocs={getDocs}
        title={title}
        document={document}
      />
      {document && (
        <DialogResult
          open={openResult}
          onClose={onCloseResult}
          data={document.action}
        />
      )}
      {document && (
        <DialogUpload
          document={document}
          getDocs={getDocs}
          onClose={onCloseImage}
          onCloseImage={onCloseImage}
          open={openImage}
          title={title}
          is_pending
        />
      )}
    </>
  )
}
