import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { CompLoading, First, iChildren, useAuthContext } from '../../../shared'

export const ProtectedAuthChildren = ({ children }: iChildren) => {
  const { profileUser, isAuthenticated } = useAuthContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    profileUser()
    setLoading(false)
  }, [profileUser])

  return loading ? (
    <CompLoading loading={loading} />
  ) : isAuthenticated ? (
    <First>{children}</First>
  ) : (
    <Navigate to="/login" />
  )
}
