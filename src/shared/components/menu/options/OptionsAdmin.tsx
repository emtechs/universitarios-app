import {
  AccountBox,
  Checklist,
  FolderShared,
  Groups,
  Home,
  LibraryAddCheck,
  People,
  School,
  Today,
  Workspaces,
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
          label="Novos Registros"
          to="record"
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
      <OtherListItemLink icon={<Workspaces />} label="Turmas" to="class" />
      <OtherListItemLink icon={<Groups />} label="Alunos" to="student" />
      <OtherListItemLink
        icon={<Checklist />}
        label="Frequências"
        to="frequency"
      />
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
