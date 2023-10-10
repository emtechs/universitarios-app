import { useState } from 'react'
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, IconButton } from '@mui/material'
import { Info } from '@mui/icons-material'
import { useSearchParams, Navigate, useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useAuthContext,
  iRegisterRequest,
  apiAuth,
  BasePage,
  registerSchema,
  BoxResp,
  Glossary,
  InputFile,
  apiImage,
} from '../../shared'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const cpf = searchParams.get('cpf') || undefined
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { isAuthenticated } = useAuthContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  if (isAuthenticated) return <Navigate to="/" />

  const create = async (data: iRegisterRequest) => {
    try {
      setLoading(true)
      const user = await apiAuth.register(
        data,
        `?date=${dayjs().format('DD/MM/YYYY')}`,
      )
      const dataImage = new FormData()
      if (data.avatar) dataImage.append('image', data.avatar)
      await apiImage.create(dataImage, user.id, '?category=FT')
      handleSucess(
        'Cadastro realizado com sucesso. Faça login no sistema utilizando seu CPF e a senha cadastrada.',
      )
      navigate(`/login?cpf=${data.login}`)
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
          defaultValues={{ login: cpf }}
          onSuccess={create}
          resolver={zodResolver(registerSchema)}
        >
          <BoxResp>
            <IconButton onClick={handleOpen} color="secondary">
              <Info />
            </IconButton>
            <TextFieldElement
              name="login"
              label="CPF"
              required
              fullWidth
              inputProps={
                cpf
                  ? {
                      readOnly: true,
                    }
                  : undefined
              }
            />
            <InputFile label="Foto de Perfil" />
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
