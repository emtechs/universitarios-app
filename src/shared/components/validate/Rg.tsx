import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form-mui'
import { Button } from '@mui/material'

export const ValidateRG = () => {
  const { setValue, watch, formState } = useFormContext()
  const rg = watch('rg')
  const { isValid } = formState

  useEffect(() => {
    if (typeof rg === 'string') {
      const notNumber = rg.replace(/\D/g, '')
      setValue('rg', notNumber)
    }
  }, [rg])

  return (
    <Button variant="contained" type="submit" disabled={!isValid} fullWidth>
      Salvar
    </Button>
  )
}
