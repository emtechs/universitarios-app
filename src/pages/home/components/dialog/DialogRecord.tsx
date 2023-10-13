import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext, DialogBase } from '../../../../shared'

export const DialogRecord = () => {
  const navigate = useNavigate()
  const { userProfile } = useAuthContext()
  const [open, setOpen] = useState(true)

  const onClose = () => setOpen((old) => !old)

  const action = () => navigate('/request')

  return userProfile && userProfile.records > 0 ? (
    <DialogBase
      open={open}
      onClose={onClose}
      title={'Novos Registros'}
      description={'Você possui novos registros aguardando análise.'}
      action={action}
      actionTitle="Verificar"
    />
  ) : (
    <></>
  )
}
