import { iChildren, useAuthContext } from '../../../shared'
import { FirstAdmin } from './Admin'
import { FirstPending } from './Pending'

export const First = ({ children }: iChildren) => {
  const { userProfile } = useAuthContext()

  if (userProfile) {
    if (
      userProfile.role !== 'ADMIN' &&
      userProfile.is_pending &&
      userProfile.record_id
    )
      return <FirstPending record_id={userProfile.record_id} />

    if (!userProfile.is_first_access) return <>{children}</>

    if (userProfile.is_first_access) return <FirstAdmin />
  }

  return <></>
}
