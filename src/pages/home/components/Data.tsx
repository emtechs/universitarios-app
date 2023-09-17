import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { Article } from '@mui/icons-material'
import { useAppThemeContext } from '../../../shared'

export const Data = () => {
  const { mdDown, theme } = useAppThemeContext()

  return (
    <Grid item xs={12} md={4}>
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
            <Article />
            Informações
          </Typography>
        </Box>
        <Divider />
        <Box p={1}>
          <Card>
            <Tooltip title="Atualizar informações">
              <CardActionArea>
                <CardContent>
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    <Typography
                      component="div"
                      height={mdDown ? theme.spacing(8) : theme.spacing(5)}
                      fontWeight="bolder"
                      variant="caption"
                    >
                      LUCAS
                    </Typography>
                    <Typography variant="caption">Turmas: </Typography>
                    <Typography variant="caption">Estudantes:</Typography>
                    <Typography variant="caption">Frequências:</Typography>
                    <Typography variant="caption">Infrequência: </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Tooltip>
          </Card>
        </Box>
      </Box>
    </Grid>
  )
}
