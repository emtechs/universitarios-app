import { iDocument } from '../../../../../shared'
import { Data } from './Data'

interface iBaseDocProps {
  title: string
  getDocs: () => void
  frente: iDocument
  verso: iDocument
}

export const BaseDoc = ({ frente, verso, getDocs, title }: iBaseDocProps) => {
  return (
    <>
      <Data document={frente} title={`${title} - Frente`} getDocs={getDocs} />
      <Data document={verso} title={`${title} - Verso`} getDocs={getDocs} />
    </>
  )
}
