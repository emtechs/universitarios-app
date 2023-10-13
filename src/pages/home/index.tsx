import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../shared'
import { HomePageAdmin, Base, Documents, Data, User, Result } from './view'
import { useMemo } from 'react'

interface iHomePageProps {
  isHome?: boolean
}

export const HomePage = ({ isHome }: iHomePageProps) => {
  const { isAuthenticated, userProfile } = useAuthContext()

  const data = useMemo(() => {
    if (!userProfile?.record_id || userProfile.is_block || !userProfile.is_open)
      return (
        <>
          <User />
        </>
      )
    return (
      <>
        <Documents />
        <Data />
        <User />
        <Result />
      </>
    )
  }, [])

  if (!isAuthenticated) return <Navigate to="/login" />

  if (userProfile?.role === 'ADMIN' && !isHome) return <HomePageAdmin />

  return <Base isHome={isHome}>{data}</Base>
}
