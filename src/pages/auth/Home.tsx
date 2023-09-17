import { zodResolver } from '@hookform/resolvers/zod'
import { Info, Login } from '@mui/icons-material'
import { IconButton, Button } from '@mui/material'
import { useState } from 'react'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  useAuthContext,
  BasePage,
  BoxResp,
  ValidateLogin,
  Glossary,
  authSchema,
  iAuthRequest,
  useAppThemeContext,
  apiAuth,
} from '../../shared'

export const HomePage = () => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { isAuthenticated } = useAuthContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  if (isAuthenticated) return <Navigate to="/home" />

  const verifyCpf = async (data: iAuthRequest) => {
    try {
      setLoading(true)
      await apiAuth.verifyCpf(data.login)
      handleSucess(
        "CPF já cadastrado. Para efetuar o login, insira sua senha e clique em 'Entrar'.",
      )
      navigate(`/login?cpf=${data.login}`)
    } catch {
      handleError(
        "CPF não cadastrado. Preencha todos os campos para realizar o seu cadastro e clique em 'Enviar'.",
      )
      navigate(`/register?cpf=${data.login}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <BasePage padding={6}>
        <FormContainer onSuccess={verifyCpf} resolver={zodResolver(authSchema)}>
          <BoxResp isLogin>
            <IconButton onClick={handleOpen} color="secondary">
              <Info />
            </IconButton>
            <TextFieldElement name="login" label="CPF" required fullWidth />
            <ValidateLogin />
            <Button
              variant="contained"
              startIcon={<Login />}
              type="submit"
              fullWidth
            >
              Entrar
            </Button>
          </BoxResp>
        </FormContainer>
      </BasePage>
      <Glossary open={open} onClose={handleOpen}>
        Por favor, insira seu CPF no campo abaixo para verificar se já possui um
        cadastro em nosso sistema. Se não estiver cadastrado, você será
        redirecionado para a página de solicitação de acesso.
      </Glossary>
    </>
  )
}
