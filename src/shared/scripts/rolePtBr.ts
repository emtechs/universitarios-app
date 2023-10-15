import { iRole } from '../interfaces'

export const rolePtBr = (role: iRole = 'COMMON') => {
  switch (role) {
    case 'ADMIN':
      return 'Administrador'

    case 'LEADER':
      return 'Líder'

    case 'COMMON':
      return 'Usuário'
  }
}
