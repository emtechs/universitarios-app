import { zodResolver } from '@hookform/resolvers/zod'
import { AccordionDetails, Box, Button } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'
import {
  iDocument,
  useAppThemeContext,
  iAvatarRequest,
  apiImage,
  apiStudent,
  avatarSchema,
  InputFile,
} from '../../../../../shared'

interface iPendingProps {
  title: string
  document: iDocument
  is_pending?: boolean
  getDocs: () => void
}

export const Pending = ({
  document,
  title,
  is_pending,
  getDocs,
}: iPendingProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateImage = async (data: iAvatarRequest) => {
    try {
      setLoading(true)
      const dataImage = new FormData()
      if (data.avatar) dataImage.append('image', data.avatar)
      await apiImage.update(document.image.id, dataImage)
      if (is_pending) {
        await apiImage.updateStatus(document.id, {
          status: 'RECEIVED',
          title,
        })
        await apiStudent.updateRecordStatus(
          {
            status: 'RECEIVED',
            justification: `${title} com pendências resolvidas`,
          },
          document.record_id,
        )
      }
      handleSucess('Foto alterada com sucesso')
      getDocs()
    } catch {
      handleError('Não foi possível atualizar a foto no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AccordionDetails>
      <FormContainer
        onSuccess={updateImage}
        resolver={zodResolver(avatarSchema)}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <InputFile label={title} />
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </Box>
      </FormContainer>
    </AccordionDetails>
  )
}
