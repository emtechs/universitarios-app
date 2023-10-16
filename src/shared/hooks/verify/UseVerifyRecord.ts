import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppThemeContext, useStudentContext } from '../../contexts'
import { apiAuth } from '../../services'

export const useVerifyRecord = () => {
  const navigate = useNavigate()
  const { setLoading } = useAppThemeContext()
  const { setRecordSelect } = useStudentContext()

  const verifyRecord = useCallback((id: string) => {
    setLoading(true)
    apiAuth
      .verify(`?record_id=${id}`)
      .then((res) => setRecordSelect(res.select))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [])

  return { verifyRecord }
}
