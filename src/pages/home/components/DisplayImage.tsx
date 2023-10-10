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
import { useState } from 'react'
import { ExpandMore } from '@mui/icons-material'
import { iDocument, useIconStatus } from '../../../shared'
import { DialogImage } from './DialogImage'

interface iDisplayImageProps {
  title: string
  document?: iDocument
}

export const DisplayImage = ({ document, title }: iDisplayImageProps) => {
  const { defineIconStatus } = useIconStatus()
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen((old) => !old)

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
            <Typography>Documento Recebido</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <DialogImage
        open={open}
        onClose={onClose}
        title={title}
        document={document}
      />
    </>
  )
}
