import { useEffect } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import { FolderShared } from '@mui/icons-material'
import {
  LayoutBasePage,
  Tools,
  Footer,
  useStudentContext,
  LabelRecord,
  useAppThemeContext,
  LinkChip,
  TitleBaseItemsPage,
} from '../../shared'
import { TabsRecordRetrievePage } from './components'
import { ViewRetrieveRecordPage } from './view'

export const RetrieveRecordPage = () => {
  const { view, record_id } = useParams()
  const { mdDown } = useAppThemeContext()
  const { recordDataRetrieve, recordSelect } = useStudentContext()

  useEffect(() => {
    if (record_id) {
      if (recordSelect?.id !== record_id) recordDataRetrieve(record_id)
    }
  }, [record_id])

  if (view) return <Outlet />

  return (
    <LayoutBasePage
      title={
        <TitleBaseItemsPage>
          <LinkChip
            label={mdDown ? '...' : 'Registros'}
            icon={<FolderShared sx={{ mr: 0.5 }} fontSize="inherit" />}
            to="/record"
          />
          <LabelRecord />
        </TitleBaseItemsPage>
      }
      tools={<Tools isBack />}
    >
      <TabsRecordRetrievePage value={view} />
      <ViewRetrieveRecordPage />
      <Footer />
    </LayoutBasePage>
  )
}
