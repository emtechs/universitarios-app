import { iShift } from '../interfaces'

export const shiftPtBr = (status: iShift = 'FULL') => {
  switch (status) {
    case 'MORNING':
      return 'MATUTINO'

    case 'AFTERNOON':
      return 'VESPERTINO'

    case 'NIGHT':
      return 'NOTURNO'

    case 'FULL':
      return 'INTREGAL'
  }
}
