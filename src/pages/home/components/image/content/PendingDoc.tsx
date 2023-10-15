import { zodResolver } from '@hookform/resolvers/zod'
import { AccordionDetails, Box } from '@mui/material'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import {
  useAppThemeContext,
  userRgSchema,
  InputDockFile,
  InputDockBackFile,
  ValidateRG,
  apiImage,
  iUserRgRequest,
  apiUser,
  apiStudent,
  useAuthContext,
} from '../../../../../shared'

interface iPendingDocProps {
  title: string
  getDocs: () => void
}

export const PendingDoc = ({ title, getDocs }: iPendingDocProps) => {
  const { userProfile, profileUser } = useAuthContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateImage = async (data: iUserRgRequest) => {
    try {
      setLoading(true)
      await apiUser.updateAuth(data)
      const dataImage = new FormData()
      const dataImageBack = new FormData()
      if (data.frente) dataImage.append('image', data.frente)
      await apiImage.create(dataImage, `?category=DOC&title=${title} - Frente`)
      if (data.verso) dataImageBack.append('image', data.verso)
      await apiImage.create(
        dataImageBack,
        `?category=DOC&title=${title} - Verso&is_back_data=true`,
      )
      if (userProfile?.record_id) {
        const is_pending = await apiUser.pending(userProfile.record_id)
        if (!is_pending) {
          await apiStudent.updateRecordStatus(
            { status: 'RECEIVED' },
            userProfile.record_id,
          )
          profileUser()
        }
      }
      handleSucess(`${title} enviado com sucesso`)
      getDocs()
    } catch {
      handleError(`Não foi possível enviar ${title} no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AccordionDetails>
      <FormContainer
        onSuccess={updateImage}
        resolver={zodResolver(userRgSchema)}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <TextFieldElement
            name="rg"
            label="Número do Documento de Identificação com Foto"
            required
            fullWidth
          />
          <InputDockFile label={`${title} - Frente`} />
          <InputDockBackFile label={`${title} - Verso`} />
          <ValidateRG />
        </Box>
      </FormContainer>
    </AccordionDetails>
  )
}
