import { Box, Container, Grid } from '@mui/material'
import { Footer, Header, iChildren, useAppThemeContext } from '../../../shared'

export const Base = ({ children }: iChildren) => {
  const { theme, mdDown } = useAppThemeContext()

  return (
    <Box display="flex" flexDirection="column">
      <Header />
      <Box mt={theme.spacing(7)}>
        <Container>
          <Grid
            container
            direction={mdDown ? 'column' : 'row'}
            spacing={mdDown ? 2 : 5}
          >
            {children}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}
