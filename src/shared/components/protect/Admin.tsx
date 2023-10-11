import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../contexts'

export const ProtectedAdmin = () => {
  const { userProfile } = useAuthContext()
  return userProfile?.role === 'ADMIN' ? (
    <Outlet />
  ) : (
    <Navigate replace to="/" />
  )
}
