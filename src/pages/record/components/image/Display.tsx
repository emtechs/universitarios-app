import { ExpandMore } from '@mui/icons-material'
import { Typography, Accordion, AccordionSummary } from '@mui/material'
import { iDocument, useIconStatus } from '../../../../shared'
import { Data } from './Data'

interface iDisplayImageProps {
  record_id: string
  title: string
  document?: iDocument
  is_analyzing?: boolean
  getData?: () => void
}

export const DisplayImage = ({
  record_id,
  title,
  document,
  getData,
  is_analyzing,
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
          {document
            ? defineIconStatus(document.status)
            : defineIconStatus('PENDING')}
          {title}
        </Typography>
      </AccordionSummary>
      {document && (
        <Data
          record_id={record_id}
          document={document}
          title={title}
          is_analyzing={is_analyzing}
          getData={getData}
        />
      )}
    </Accordion>
  )
}
