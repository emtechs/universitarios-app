import { Box, Container, Grid } from '@mui/material'
import { Footer, Header, iChildren, useAppThemeContext } from '../../../shared'

interface iBaseProps extends iChildren {
  isHome?: boolean
}

export const Base = ({ children, isHome }: iBaseProps) => {
  const { theme, mdDown } = useAppThemeContext()

  return (
    <Box display="flex" flexDirection="column">
      <Header isHome={isHome} />
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
