import {
  DialogBase,
  useAppThemeContext,
  apiImage,
  apiStudent,
  useAuthContext,
} from '../../../../shared'

interface iDialogEditProps {
  title: string
  open: boolean
  onClose: () => void
  getDocs: () => void
  document_id: string
}

export const DialogEdit = ({
  document_id,
  getDocs,
  onClose,
  open,
  title,
}: iDialogEditProps) => {
  const { userProfile, profileUser } = useAuthContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateImage = async () => {
    try {
      onClose()
      setLoading(true)
      await apiImage.destroyDoc(document_id)
      if (userProfile?.record_id) {
        await apiStudent.updateRecordStatus(
          { status: 'PENDING', justification: `Solicitado Novo ${title}` },
          userProfile.record_id,
        )
        profileUser()
      }
      handleSucess(`Alteração do ${title} solicitado com sucesso`)
      getDocs()
    } catch {
      handleError(`Não foi possível solicitar ${title} alteração no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBase
      open={open}
      onClose={onClose}
      title={`Alterar ${title}`}
      description="Você está prestes a efetuar alterações em um documento que já foi confirmado. Se você deseja prosseguir com essa ação, saiba que o processo retornará à fase de pendência. Caso esteja seguro de sua decisão, clique em 'Continuar'."
      action={updateImage}
      actionTitle="Continuar"
    />
  )
}
