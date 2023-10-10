import { iStatus } from '../interfaces'

export const statusPtBr = (status: iStatus = 'RECEIVED') => {
  switch (status) {
    case 'ANALYZING':
      return 'Em Análise'

    case 'BLOCKED':
      return 'Bloqueado'

    case 'CONFIRMED':
      return 'Confirmado'

    case 'PENDING':
      return 'Com Pendências'

    case 'RECEIVED':
      return 'Recebido'

    case 'REFUSED':
      return 'Recusado'
  }
}
