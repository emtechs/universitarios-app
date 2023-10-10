import { Info } from '@mui/icons-material'
import { IconButton, Button, Box } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from 'react-hook-form-mui'
import {
  AutoCompleteSchool,
  BasePage,
  BoxResp,
  Glossary,
  InputFile,
  apiImage,
  apiStudent,
  iRecordUpdateRequest,
  recordUpdateSchema,
  useAppThemeContext,
  useAuthContext,
} from '../../../shared'

interface iFirstPendingProps {
  id: string
  record_id: string
}

export const FirstPending = ({ id, record_id }: iFirstPendingProps) => {
  const { profileUser } = useAuthContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const first = async (data: iRecordUpdateRequest) => {
    try {
      setLoading(true)
      await apiStudent.updateRecord(data, record_id)
      const dataImage = new FormData()
      if (data.avatar) dataImage.append('image', data.avatar)
      await apiImage.create(
        dataImage,
        id,
        `?category=MAT&key_record=${record_id}`,
      )
      handleSucess('Dados cadastrados com sucesso')
      profileUser()
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
          resolver={zodResolver(recordUpdateSchema)}
        >
          <BoxResp>
            <IconButton onClick={handleOpen} color="secondary">
              <Info />
            </IconButton>
            <InputFile label="Foto da Declaração da Instituição de Ensino ou Atestado de Matrícula" />
            <div className="w-full">
              <AutoCompleteSchool />
            </div>
            <TextFieldElement name="course" label="Curso" required fullWidth />
            <Box display="flex" gap={1}>
              <TextFieldElement
                name="semester"
                label="Semestre Atual"
                required
                fullWidth
                type="number"
              />
              <TextFieldElement
                name="total"
                label="Total de Semestres"
                required
                fullWidth
                type="number"
              />
            </Box>
            <SelectElement
              label="Turno"
              name="shift"
              fullWidth
              options={[
                {
                  id: 'MORNING',
                  label: 'MATUTINO',
                },
                {
                  id: 'AFTERNOON',
                  label: 'VESPERTINO',
                },
                {
                  id: 'NIGHT',
                  label: 'NOTURNO',
                },
                {
                  id: 'FULL',
                  label: 'INTREGAL',
                },
              ]}
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
