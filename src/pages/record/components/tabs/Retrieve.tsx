import { FolderShared, History, PermMedia } from '@mui/icons-material'
import { useStudentContext, TabsBase } from '../../../../shared'

interface iTabsRecordRetrievePageProps {
  value?: string
}

export const TabsRecordRetrievePage = ({
  value = '',
}: iTabsRecordRetrievePageProps) => {
  const { recordSelect } = useStudentContext()

  const href = `/record/${recordSelect?.id}`

  const elemArr = [
    { icon: <FolderShared />, label: 'Registro', value: '', href },
    {
      icon: <PermMedia />,
      label: 'Documentos',
      value: 'doc',
      href: `${href}/doc`,
    },
    {
      icon: <History />,
      label: 'Histórico',
      value: 'history',
      href: `${href}/history`,
    },
  ]

  return <TabsBase value={value} elemArr={elemArr} />
}
