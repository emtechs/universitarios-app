import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Cancel,
  CheckCircle,
  ExpandMore,
  Pending,
  PermMedia,
  Sync,
} from '@mui/icons-material'
import { useAppThemeContext } from '../../../shared'

export const Documents = () => {
  const { theme } = useAppThemeContext()

  return (
    <Grid item xs={12} md={5}>
      <Box component={Paper}>
        <Box
          height={theme.spacing(7)}
          width="100%"
          display="flex"
          alignItems="center"
          p={1}
        >
          <Typography
            component="div"
            variant="h6"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <PermMedia />
            Documentos
          </Typography>
        </Box>
        <Divider />
        <Box p={1}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography
                component="div"
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <Tooltip title="Documento validado">
                  <CheckCircle color="success" />
                </Tooltip>
                Foto
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Tooltip title="Alterar foto">
                <IconButton size="small">
                  <Avatar sx={{ width: '150px', height: '150px' }} />
                </IconButton>
              </Tooltip>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography
                component="div"
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <Tooltip title="Documento invalidado">
                  <Cancel color="error" />
                </Tooltip>
                Documento de Identificação
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" gap={1}>
                <Box>
                  <Tooltip title="Alterar Documento de Identificação - Frente">
                    <IconButton size="small">
                      <Avatar sx={{ width: '150px', height: '150px' }} />
                    </IconButton>
                  </Tooltip>
                  <Typography textAlign="center">Frente</Typography>
                </Box>
                <Box>
                  <Tooltip title="Alterar Documento de Identificação - Verso">
                    <IconButton size="small">
                      <Avatar sx={{ width: '150px', height: '150px' }} />
                    </IconButton>
                  </Tooltip>
                  <Typography textAlign="center">Verso</Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography
                component="div"
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <Tooltip title="Documento em análise">
                  <Sync color="warning" />
                </Tooltip>
                Comprovante de Endereço
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Tooltip title="Alterar Comprovante de Endereço">
                <IconButton size="small">
                  <Avatar sx={{ width: '150px', height: '150px' }} />
                </IconButton>
              </Tooltip>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography
                component="div"
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <Tooltip title="Documento pendente">
                  <Pending color="disabled" />
                </Tooltip>
                Declaração da Instituição de Ensino ou Atestado de Matrícula
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Tooltip title="Alterar Declaração da Instituição de Ensino ou Atestado de Matrícula">
                <IconButton size="small">
                  <Avatar sx={{ width: '150px', height: '150px' }} />
                </IconButton>
              </Tooltip>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Grid>
  )
}
