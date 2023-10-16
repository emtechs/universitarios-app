import { ExpandMore } from '@mui/icons-material'
import { Typography, Accordion, AccordionSummary } from '@mui/material'
import { iCategoryDoc, iDocument, useIconStatus } from '../../../../shared'
import { Data } from './Data'

interface iDisplayImageProps {
  title: string
  category: iCategoryDoc
  document?: iDocument
}

export const DisplayImage = ({ document, title }: iDisplayImageProps) => {
  const { defineIconStatus } = useIconStatus()

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography
          component="div"
          variant="subtitle1"
          display="flex"
          alignItems="center"
          gap={1}
        >
          {document
            ? defineIconStatus(document.status)
            : defineIconStatus('PENDING')}
          {title}
        </Typography>
      </AccordionSummary>
      {document && <Data document={document} title={title} />}
    </Accordion>
  )
}
