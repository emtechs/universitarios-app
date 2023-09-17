import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { Analytics } from '@mui/icons-material'
import { useAppThemeContext } from '../../../shared'

export const Result = () => {
  const { theme } = useAppThemeContext()

  return (
    <Grid item xs={12}>
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
            <Analytics />
            Resultado
          </Typography>
        </Box>
        <Divider />
        <Box p={1}>
          <Typography>Pendente</Typography>
        </Box>
      </Box>
    </Grid>
  )
}
