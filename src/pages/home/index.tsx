import { Box, Container, Grid } from '@mui/material'
import { HomePageAdmin } from './Admin'
import { Data, Documents, Result, User } from './components'
import { useAppThemeContext, useAuthContext, Header } from '../../shared'

interface iAuthHomePageProps {
  isHome?: boolean
}

export const AuthHomePage = ({ isHome }: iAuthHomePageProps) => {
  const { theme, mdDown } = useAppThemeContext()
  const { userProfile } = useAuthContext()

  if (userProfile?.role === 'ADMIN' && !isHome) return <HomePageAdmin />

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
            <Documents />
            <Data />
            <User />
            <Result />
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
