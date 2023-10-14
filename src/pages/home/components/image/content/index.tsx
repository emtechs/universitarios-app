import { iDocument } from '../../../../../shared'
import { Data } from './Data'
import { Pending } from './Pending'

interface iBaseProps {
  title: string
  getDocs: () => void
  document: iDocument
}

export const Base = ({ document, getDocs, title }: iBaseProps) => {
  return (
    <>
      {document.status !== 'PENDING' && (
        <Data document={document} title={title} getDocs={getDocs} />
      )}
      {document.status === 'PENDING' && (
        <Pending document={document} getDocs={getDocs} title={title} />
      )}
    </>
  )
}
