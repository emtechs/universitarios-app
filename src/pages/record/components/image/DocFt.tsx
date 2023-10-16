import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionSummary, Typography } from '@mui/material'
import { iDocument, useIconStatus } from '../../../../shared'
import { Data } from './Data'

interface iDocFtProps {
  title: string
  frente?: iDocument
  verso?: iDocument
}

export const DocFt = ({ frente, title, verso }: iDocFtProps) => {
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
      {frente && verso && (
        <>
          <Data document={frente} title={`${title} - Frente`} />
          <Data document={verso} title={`${title} - Verso`} />
        </>
      )}
    </Accordion>
  )
}
