import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { FormContainer } from 'react-hook-form-mui'
import {
  DialogBaseChildren,
  DialogBaseChildrenAction,
  InputFile,
  apiImage,
  avatarSchema,
  iAvatarRequest,
  iDocument,
  useAppThemeContext,
} from '../../../shared'

interface iDialogImageProps {
  title: string
  open: boolean
  onClose: () => void
  getDocs: () => void
  document?: iDocument
}

export const DialogImage = ({
  onClose,
  open,
  getDocs,
  title,
  document,
}: iDialogImageProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const [openImage, setOpenImage] = useState(false)
  const onCloseImage = () => setOpenImage((old) => !old)

  const updateImage = async (id: string, data: iAvatarRequest) => {
    try {
      onCloseImage()
      onClose()
      setLoading(true)
      const dataImage = new FormData()
      if (data.avatar) dataImage.append('image', data.avatar)
      await apiImage.update(id, dataImage)
      handleSucess('Foto alterada com sucesso')
      getDocs()
    } catch {
      handleError('Não foi possível atualizar a foto no momento!')
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      {document?.status !== 'ANALYZING' ? (
        <DialogBaseChildrenAction
          open={open}
          onClose={onClose}
          title={`Visualizar ${title}`}
          description=""
          action={onCloseImage}
          actionTitle="Alterar"
        >
          <img src={document?.image.url} alt={title} />
        </DialogBaseChildrenAction>
      ) : (
        <DialogBaseChildren
          open={open}
          onClose={onClose}
          description=""
          title={`Alterar ${title}`}
        >
          <img src={document?.image.url} alt={title} />
        </DialogBaseChildren>
      )}
      {document && (
        <DialogBaseChildren
          open={openImage}
          onClose={onCloseImage}
          description=""
          title={`Alterar ${title}`}
        >
          <FormContainer
            onSuccess={(data) => updateImage(document.image.id, data)}
            resolver={zodResolver(avatarSchema)}
          >
            <Box display="flex" flexDirection="column" gap={2}>
              <InputFile label={title} />
              <Button variant="contained" type="submit">
                Salvar
              </Button>
            </Box>
          </FormContainer>
        </DialogBaseChildren>
      )}
    </>
  )
}