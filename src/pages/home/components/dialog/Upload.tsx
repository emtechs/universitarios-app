import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Typography } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'
import {
  iDocument,
  DialogBaseChildren,
  avatarSchema,
  InputFile,
  apiImage,
  iAvatarRequest,
  useAppThemeContext,
  useAuthContext,
  apiUser,
  apiRecord,
} from '../../../../shared'

interface iDialogUploadProps {
  open: boolean
  onClose: () => void
  title: string
  document: iDocument
  is_pending?: boolean
  onCloseImage: () => void
  getDocs: () => void
}

export const DialogUpload = ({
  document,
  onClose,
  open,
  title,
  is_pending,
  onCloseImage,
  getDocs,
}: iDialogUploadProps) => {
  const { profileUser } = useAuthContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateImage = async (data: iAvatarRequest) => {
    try {
      onCloseImage()
      setLoading(true)
      const dataImage = new FormData()
      if (data.avatar) dataImage.append('image', data.avatar)
      await apiImage.update(document.image.id, dataImage)
      if (is_pending) {
        await apiImage.updateStatus(document.id, {
          status: 'RECEIVED',
          title,
        })
        const is_pending_data = await apiUser.pending(document.record_id)
        if (!is_pending_data) {
          await apiRecord.updateStatus(
            { status: 'RECEIVED' },
            document.record_id,
            '',
          )
          profileUser()
        }
      }
      handleSucess(`${title} alterado com sucesso`)
      getDocs()
    } catch {
      handleError(`Não foi possível atualizar ${title} no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      description=""
      title={is_pending ? 'Resolver' : `Alterar ${title}`}
    >
      <FormContainer
        onSuccess={updateImage}
        resolver={zodResolver(avatarSchema)}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          {is_pending && (
            <Typography>{document.action.justification}</Typography>
          )}
          <InputFile label={title} />
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </Box>
      </FormContainer>
    </DialogBaseChildren>
  )
}
