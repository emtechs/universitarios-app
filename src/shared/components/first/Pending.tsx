import { Info } from '@mui/icons-material'
import { IconButton, Button, Box } from '@mui/material'
import { useState } from 'react'
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
} from 'react-hook-form-mui'
import { AutoCompleteSchool, BasePage, BoxResp, Glossary, InputFile } from '..'

export const Pending = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  return (
    <>
      <BasePage padding={5}>
        <FormContainer>
          <BoxResp>
            <IconButton onClick={handleOpen} color="secondary">
              <Info />
            </IconButton>
            <InputFile label="Foto da Declaração da Instituição de Ensino ou Atestado de Matrícula" />
            <TextFieldElement name="course" label="Curso" required fullWidth />
            <Box display="flex" gap={1}>
              <TextFieldElement
                name="semester"
                label="Semestre"
                required
                fullWidth
                type="number"
              />
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
            </Box>
            <AutoCompleteSchool />
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
