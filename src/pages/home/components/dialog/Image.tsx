import { useMemo, useState } from 'react'
import {
  iDocument,
  DialogBaseChildren,
  DialogBaseChildrenAction,
  useAuthContext,
} from '../../../../shared'
import { DialogUpload } from './Upload'

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
  const { userProfile } = useAuthContext()
  const [openImage, setOpenImage] = useState(false)
  const onCloseImage = () => setOpenImage((old) => !old)

  const dialog = useMemo(() => {
    if (userProfile?.status !== 'ANALYZING' && document?.status === 'RECEIVED')
      return (
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
      )

    return (
      <DialogBaseChildren
        open={open}
        onClose={onClose}
        description=""
        title={`Visualizar ${title}`}
      >
        <img src={document?.image.url} alt={title} />
      </DialogBaseChildren>
    )
  }, [document, onClose, open, title, userProfile])

  return (
    <>
      {dialog}
      {document && (
        <DialogUpload
          document={document}
          onClose={onCloseImage}
          open={openImage}
          title={title}
          onCloseImage={() => {
            onClose()
            onCloseImage()
          }}
          getDocs={getDocs}
        />
      )}
    </>
  )
}
