import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../shared'
import {
  HomePageAdmin,
  Base,
  Documents,
  Data,
  User,
  Result,
  Line,
  LineBack,
} from './view'
import { useMemo } from 'react'

export const HomePage = () => {
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

    if (userProfile.status === 'CONFIRMED')
      return (
        <>
          <Line />
          <LineBack />
          <User />
          <Result />
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
  }, [userProfile])

  if (!isAuthenticated) return <Navigate to="/login" />

  if (userProfile?.role === 'ADMIN') return <HomePageAdmin />

  return <Base>{data}</Base>
}
