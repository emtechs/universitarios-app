import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { Logout } from '@mui/icons-material'
import {
  useAppThemeContext,
  useDrawerContext,
  useAuthContext,
  adaptName,
} from '../../../shared'
import { Options } from './options'

export const MenuDrawer = () => {
  const { theme, smDown } = useAppThemeContext()
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext()
  const { userProfile, logout } = useAuthContext()
  const user = {
    name: adaptName(userProfile?.name),
    src: userProfile?.profile?.url,
  }

  return (
    <Drawer
      open={isDrawerOpen}
      variant={smDown ? 'temporary' : 'permanent'}
      onClose={toggleDrawerOpen}
    >
      <Box
        display="flex"
        flexDirection="column"
        width={theme.spacing(28)}
        height="100%"
      >
        <Box
          width="100%"
          bgcolor={theme.palette.primary.main}
          height={theme.spacing(17)}
          display="flex"
          flexDirection="column"
          flexShrink={0}
          justifyContent="space-evenly"
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <img src="/logo_out.webp" alt="De Olho na Frequência" />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={theme.spacing(0.5)}
          >
            <Avatar
              src={user.src}
              sx={{
                bgcolor: theme.palette.secondary.main,
              }}
            />
            <Typography color={theme.palette.primary.contrastText}>
              {user.name}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box flex={1}>
          <List component="nav">
            <Options />
          </List>
        </Box>
        <Box>
          <List component="nav">
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </Drawer>
  )
}
