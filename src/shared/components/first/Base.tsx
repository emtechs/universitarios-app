import { zodResolver } from '@hookform/resolvers/zod'
import { Info } from '@mui/icons-material'
import { useState } from 'react'
import { IconButton, Button } from '@mui/material'
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
} from 'react-hook-form-mui'
import {
  BasePage,
  BoxResp,
  Glossary,
  apiUser,
  iUserFirstRequest,
  useAppThemeContext,
  useAuthContext,
  userFirstSchema,
} from '../../../shared'

interface iBaseProps {
  id: string
}

export const Base = ({ id }: iBaseProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { handleUserProfile } = useAuthContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const first = async (data: iUserFirstRequest) => {
    try {
      setLoading(true)
      const user = await apiUser.update(id, data)
      handleSucess('Dados cadastrados com sucesso')
      handleUserProfile(user)
    } catch {
      handleError('Não foi possível cadastrar os dados no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <BasePage padding={5}>
        <FormContainer
          onSuccess={first}
          resolver={zodResolver(userFirstSchema)}
        >
          <BoxResp>
            <IconButton onClick={handleOpen} color="secondary">
              <Info />
            </IconButton>
            <TextFieldElement
              name="name"
              label="Nome completo"
              required
              fullWidth
            />
            <TextFieldElement
              name="email"
              label="Email"
              type="email"
              required
              fullWidth
            />
            <PasswordElement name="password" label="Senha" required fullWidth />
            <PasswordElement
              name="repeat_password"
              label="Confirmar Senha"
              required
              fullWidth
            />
            <Button variant="contained" type="submit" fullWidth>
              Enviar
            </Button>
          </BoxResp>
        </FormContainer>
      </BasePage>
      <Glossary open={open} onClose={handleOpen}>
        Preencha as informações com seus dados para obter acesso ao sistema.
      </Glossary>
    </>
  )
}
