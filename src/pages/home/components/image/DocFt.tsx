import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionSummary, Typography } from '@mui/material'
import { iDocumentID, useIconStatus } from '../../../../shared'
import { BaseDoc, PendingDoc } from './content'

interface iDocFtProps {
  title: string
  getDocs: () => void
  docID?: iDocumentID
}

export const DocFt = ({ getDocs, title, docID }: iDocFtProps) => {
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
      {docID ? (
        <BaseDoc
          frente={docID.frente}
          verso={docID.verso}
          getDocs={getDocs}
          title={title}
        />
      ) : (
        <PendingDoc getDocs={getDocs} title={title} />
      )}
    </Accordion>
  )
}
