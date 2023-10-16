import { useCallback, useEffect, useState } from 'react'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Chip, Grid, Paper } from '@mui/material'
import { Sync } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import {
  DialogBaseChildren,
  Footer,
  InputFile,
  LabelRecord,
  LayoutBasePage,
  TitleBaseItemsPage,
  apiImage,
  apiUser,
  avatarSchema,
  iAvatarRequest,
  iUserUpdateRequest,
  useAppThemeContext,
  useAuthContext,
} from '../../../shared'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

export const ViewAnalyzingRecordPage = () => {
  const navigate = useNavigate()
  const { handleUserProfile, userProfile } = useAuthContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const [open, setOpen] = useState(false)

  const onClose = () => setOpen((old) => !old)

  const updateUser = async (data: iUserUpdateRequest) => {
    try {
      setLoading(true)
      await apiUser.updateAuth(data)
      handleSucess('Dados alterado com sucesso')
      getUser()
      navigate('/')
    } catch {
      handleError('Não foi possível atualizar os dados no momento!')
    } finally {
      setLoading(false)
    }
  }

  const updateImage = async (data: iAvatarRequest) => {
    try {
      onClose()
      setLoading(true)
      const dataImage = new FormData()
      if (data.avatar) dataImage.append('image', data.avatar)
      await apiImage.createUser(dataImage)
      handleSucess('Foto alterada com sucesso')
      getUser()
    } catch {
      handleError('Não foi possível atualizar a foto no momento!')
    } finally {
      setLoading(false)
    }
  }

  const getUser = useCallback(() => {
    setLoading(true)
    apiUser
      .page('')
      .then((res) => handleUserProfile(res.user))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => getUser(), [])

  return (
    <>
      <LayoutBasePage
        title={
          <TitleBaseItemsPage>
            <LabelRecord clickable />
            <Chip
              color="primary"
              label="Analizar"
              icon={<Sync sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleBaseItemsPage>
        }
      >
        <FormContainer
          values={{
            name: userProfile?.name || '',
            email: userProfile?.email || '',
          }}
          onSuccess={updateUser}
          // resolver={zodResolver(userUpdateSchema)}
        >
          <Box
            m={2}
            display="flex"
            flexDirection="column"
            component={Paper}
            variant="outlined"
          >
            <Grid
              container
              direction="row"
              p={2}
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={5}>
                <TextFieldElement
                  name="name"
                  label="Nome completo"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={5}>
                <TextFieldElement
                  name="email"
                  label="Email"
                  required
                  fullWidth
                />
              </Grid>

              <Button variant="contained" type="submit" fullWidth>
                Enviar
              </Button>
            </Grid>
          </Box>
        </FormContainer>
        <Footer />
      </LayoutBasePage>
      <DialogBaseChildren
        open={open}
        onClose={onClose}
        description=""
        title="Alterar Foto de Perfil"
      >
        <FormContainer
          onSuccess={updateImage}
          resolver={zodResolver(avatarSchema)}
        >
          <Box
            display="flex"
            gap={2}
            justifyContent="center"
            alignItems="center"
          >
            <InputFile label="Foto de Perfil" />
            <Button variant="contained" type="submit">
              Salvar
            </Button>
          </Box>
        </FormContainer>
      </DialogBaseChildren>
    </>
  )
}
