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
    let status
    if (
      !userProfile?.record_id ||
      userProfile.is_block ||
      !userProfile.is_open
    ) {
      if (!userProfile?.is_open) status = 'FORA DO PERÍODO'
      if (!userProfile?.status && userProfile?.is_block) status = 'BLOQUEADO'
      return (
        <>
          <Result is_block />
          <User status={status} />
        </>
      )
    }

    return (
      <>
        <Documents />
        <Data />
        <User />
        <Result />
      </>
    )
  }, [userProfile])

  if (!isAuthenticated) return <Navigate to="/login" />

  if (userProfile?.role === 'ADMIN' && !isHome) return <HomePageAdmin />

  return <Base isHome={isHome}>{data}</Base>
}
