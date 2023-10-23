import {
  AccountBox,
  DirectionsBus,
  FolderShared,
  Home,
  LibraryAddCheck,
  People,
  Place,
  Route,
  Rule,
  School,
  Today,
} from '@mui/icons-material'
import { Badge } from '@mui/material'
import { useAuthContext, useDrawerContext } from '../../../../shared'
import { OtherListItemLink, ListItemLinkOpen, Profile } from '../components'

export const OptionsAdmin = () => {
  const { userProfile } = useAuthContext()
  const { handleClickProfile, openProfile } = useDrawerContext()

  return (
    <>
      {userProfile && userProfile.records > 0 && (
        <OtherListItemLink
          icon={
            <Badge badgeContent={userProfile.records} color="primary">
              <LibraryAddCheck />
            </Badge>
          }
          label="Recebidos"
          to="record/RECEIVED"
        />
      )}
      {userProfile && userProfile.analysis > 0 && (
        <OtherListItemLink
          icon={
            <Badge badgeContent={userProfile.analysis} color="primary">
              <Rule />
            </Badge>
          }
          label="Em Análise"
          to={`record/ANALYZING?analyst_id=${userProfile.id}`}
        />
      )}
      <OtherListItemLink icon={<Home />} label="Página Inicial" />
      <OtherListItemLink icon={<People />} label="Usuários" to="user" />
      <OtherListItemLink
        icon={<FolderShared />}
        label="Registros"
        to="record"
      />
      <OtherListItemLink icon={<School />} label="Instituições" to="school" />
      <OtherListItemLink icon={<DirectionsBus />} label="Ônibus" to="bus" />
      <OtherListItemLink icon={<Route />} label="Rotas" to="route" />
      <OtherListItemLink icon={<Place />} label="Paradas" to="place" />
      <OtherListItemLink icon={<Today />} label="Período" to="period" />
      <ListItemLinkOpen
        onClick={handleClickProfile}
        open={openProfile}
        icon={<AccountBox />}
        label="Perfil"
      >
        <Profile />
      </ListItemLinkOpen>
    </>
  )
}
