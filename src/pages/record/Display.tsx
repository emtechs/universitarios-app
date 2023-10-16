import { useParams } from 'react-router-dom'
import {
  ViewAnalyzingRecordPage,
  ViewDocRecordPage,
  ViewHistoryRecordPage,
} from './view'

export const DisplayRecordPage = () => {
  const { view } = useParams()

  switch (view) {
    case 'doc':
      return <ViewDocRecordPage />
    case 'history':
      return <ViewHistoryRecordPage />
    case 'analyzing':
      return <ViewAnalyzingRecordPage />
  }

  return <></>
}
