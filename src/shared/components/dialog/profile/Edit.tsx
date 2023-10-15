import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import {
  useAppThemeContext,
  BaseContentChildren,
  DialogBaseChildren,
  apiUser,
  iUserUpdateRequest,
  useDialogContext,
  userUpdateSchema,
  useAuthContext,
} from '../../../../shared'

export const DialogEditProfile = () => {
  const { profileUser, userProfile } = useAuthContext()
  const { openCreate, handleOpenCreate } = useDialogContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateUser = async (data: iUserUpdateRequest) => {
    try {
      handleOpenCreate()
      setLoading(true)
      await apiUser.updateAuth(data)
      handleSucess('Dados alterado com sucesso')
      profileUser()
    } catch {
      handleError('Não foi possível atualizar os dados no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Editar Perfil"
      description=""
    >
      <FormContainer
        defaultValues={{ name: userProfile?.name, email: userProfile?.email }}
        onSuccess={updateUser}
        resolver={zodResolver(userUpdateSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement
            name="name"
            label="Nome completo"
            required
            fullWidth
          />
          <TextFieldElement name="email" label="Email" required fullWidth />
          <Button variant="contained" type="submit" fullWidth>
            Enviar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
