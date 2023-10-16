import { zodResolver } from '@hookform/resolvers/zod'
import { AccordionDetails, Box, Button } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'
import {
  useAppThemeContext,
  iAvatarRequest,
  apiImage,
  avatarSchema,
  InputFile,
  iCategoryDoc,
  useAuthContext,
  apiUser,
  apiRecord,
} from '../../../../../shared'

interface iPendingProps {
  title: string
  category: iCategoryDoc
  getDocs: () => void
}

export const Pending = ({ category, getDocs, title }: iPendingProps) => {
  const { userProfile, profileUser } = useAuthContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateImage = async (data: iAvatarRequest) => {
    try {
      setLoading(true)
      const dataImage = new FormData()
      if (data.avatar) dataImage.append('image', data.avatar)
      await apiImage.create(dataImage, `?category=${category}&title=${title}`)
      if (userProfile?.record_id) {
        const is_pending = await apiUser.pending(userProfile.record_id)
        if (!is_pending) {
          await apiRecord.updateStatus(
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
