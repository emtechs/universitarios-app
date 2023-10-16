import { Link } from 'react-router-dom'
import { Box, Tabs, Tab } from '@mui/material'
import { useAuthContext } from '../../../../shared'

interface iTabsRecordPageProps {
  value?: string
}

export const TabsRecordPage = ({ value = '' }: iTabsRecordPageProps) => {
  const { userProfile } = useAuthContext()
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        <Tab label="Registros" value="" component={Link} to={'/record'} />
        {userProfile && userProfile.records > 0 && (
          <Tab
            label="Recebidos"
            value="RECEIVED"
            component={Link}
            to={'/record/RECEIVED'}
          />
        )}
        <Tab
          label="Em Análise"
          value="ANALYZING"
          component={Link}
          to={'/record/ANALYZING'}
        />
        <Tab
          label="Com Pendências"
          value="PENDING"
          component={Link}
          to={'/record/PENDING'}
        />
      </Tabs>
    </Box>
  )
}
