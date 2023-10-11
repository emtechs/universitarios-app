import { useAuthContext } from '../../../shared/contexts'
import { CreateFrequencyCommon } from './CreateFrequency'
import { CreateFrequencyAdm } from './CreateFrequencyAdm'

export const CreateFrequencyPage = () => {
  const { userProfile } = useAuthContext()
  switch (userProfile?.role) {
    case 'ADMIN':
      return <CreateFrequencyAdm />

    default:
      return <CreateFrequencyCommon />
  }
}
