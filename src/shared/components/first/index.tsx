import { iChildren, useAuthContext } from '../../../shared'
import { Base } from './Base'
import { Pending } from './Pending'

export const First = ({ children }: iChildren) => {
  const { userProfile } = useAuthContext()

  if (userProfile) {
    if (userProfile.role === 'ADMIN' && !userProfile.is_first_access)
      return <>{children}</>

    if (userProfile.role !== 'ADMIN') {
      if (!userProfile.is_open) return <></>
      if (userProfile.is_open && userProfile.is_pending) return <Pending />
      if (
        userProfile.is_open &&
        !userProfile.is_pending &&
        !userProfile.is_first_access
      )
        return <>{children}</>
    }
  }

  return <>{userProfile ? <Base id={userProfile.id} /> : <></>}</>
}
