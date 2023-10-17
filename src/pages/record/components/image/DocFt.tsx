import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionSummary, Typography } from '@mui/material'
import { iDocumentID, useIconStatus } from '../../../../shared'
import { Data } from './Data'

interface iDocFtProps {
  record_id: string
  title: string
  docID?: iDocumentID
  is_analyzing?: boolean
  getData?: () => void
}

export const DocFt = ({
  record_id,
  title,
  docID,
  getData,
  is_analyzing,
}: iDocFtProps) => {
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
          {docID ? defineIconStatus(docID.status) : defineIconStatus('PENDING')}
          {title}
        </Typography>
      </AccordionSummary>
      {docID && (
        <>
          <Data
            record_id={record_id}
            document={docID.frente}
            title={`${title} - Frente`}
            is_analyzing={is_analyzing}
            getData={getData}
          />
          <Data
            record_id={record_id}
            document={docID.verso}
            title={`${title} - Verso`}
            is_analyzing={is_analyzing}
            getData={getData}
          />
        </>
      )}
    </Accordion>
  )
}
