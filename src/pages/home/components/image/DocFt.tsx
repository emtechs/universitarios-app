import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionSummary, Typography } from '@mui/material'
import { iDocument, useIconStatus } from '../../../../shared'
import { BaseDoc, PendingDoc } from './content'

interface iDocFtProps {
  title: string
  getDocs: () => void
  frente?: iDocument
  verso?: iDocument
}

export const DocFt = ({ frente, getDocs, title, verso }: iDocFtProps) => {
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
          {frente
            ? defineIconStatus(frente.status)
            : defineIconStatus('PENDING')}
          {title}
        </Typography>
      </AccordionSummary>
      {frente && verso ? (
        <BaseDoc
          frente={frente}
          verso={verso}
          getDocs={getDocs}
          title={title}
        />
      ) : (
        <PendingDoc getDocs={getDocs} title={title} />
      )}
    </Accordion>
  )
}
