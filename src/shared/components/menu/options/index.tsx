import { useAuthContext, useDrawerContext } from '../../../contexts'
import { OptionsAdmin } from './OptionsAdmin'
import { OptionsSchool } from './OptionsSchool'

export const Options = () => {
  const { userProfile } = useAuthContext()
  const { displayDash } = useDrawerContext()

  switch (userProfile?.role) {
    case 'ADMIN':
      return displayDash === 'ADMIN' ? <OptionsAdmin /> : <OptionsSchool />

    default:
      return <OptionsSchool />
  }
}
