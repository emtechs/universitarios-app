import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../contexts'

export const ProtectedSchool = () => {
  const { userProfile } = useAuthContext()

  if (userProfile) {
    if (userProfile.role === 'ADMIN') return <Outlet />
    return <Navigate replace to="/" />
  }
  return <Navigate replace to="/" />
}
