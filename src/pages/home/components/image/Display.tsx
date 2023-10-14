import { ExpandMore } from '@mui/icons-material'
import { Typography, Accordion, AccordionSummary } from '@mui/material'
import { iDocument, useIconStatus } from '../../../../shared'
import { Base } from './content'

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
          {defineIconStatus(document?.status)}
          {title}
        </Typography>
      </AccordionSummary>
      {document && <Base document={document} getDocs={getDocs} title={title} />}
    </Accordion>
  )
}
