import { useAuthContext } from '../../../shared/contexts'
import { ListFrequencyCommon } from './ListFrequencyCommon'
import { ListFrequencyAdm } from './ListFrequencyAdm'

export const ListFrequencyPage = () => {
  const { userProfile } = useAuthContext()
  switch (userProfile?.role) {
    case 'ADMIN':
      return <ListFrequencyAdm />

    default:
      return <ListFrequencyCommon />
  }
}
