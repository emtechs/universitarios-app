import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext, DialogBase } from '../../../../shared'

export const DialogRecord = () => {
  const navigate = useNavigate()
  const { userProfile } = useAuthContext()
  const [open, setOpen] = useState(true)

  const onClose = () => setOpen((old) => !old)

  if (userProfile && userProfile.analysis > 0) {
    const action = () =>
      navigate(`/record/ANALYZING?analyst_id=${userProfile.id}`)
    return (
      <DialogBase
        open={open}
        onClose={onClose}
        title={'Registros Em Análise'}
        description={'Você possui registros aguardando resposta.'}
        action={action}
        actionTitle="Verificar"
      />
    )
  }

  if (userProfile && userProfile.records > 0) {
    const action = () => navigate('/record/RECEIVED')
    return (
      <DialogBase
        open={open}
        onClose={onClose}
        title={'Registros Recebidos'}
        description={'Você possui registros aguardando análise.'}
        action={action}
        actionTitle="Verificar"
      />
    )
  }

  return <></>
}
