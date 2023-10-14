import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionSummary, Typography } from '@mui/material'
import { iDocument, useIconStatus } from '../../../../shared'
import { Base } from './content'

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
          {defineIconStatus(frente?.status)}
          {title}
        </Typography>
      </AccordionSummary>
      {frente && (
        <Base document={frente} getDocs={getDocs} title={`${title} - Frente`} />
      )}
      {verso && (
        <Base document={verso} getDocs={getDocs} title={`${title} - Verso`} />
      )}
    </Accordion>
  )
}
