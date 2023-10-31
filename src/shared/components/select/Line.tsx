import { AutocompleteElement, useFormContext } from 'react-hook-form-mui'
import { useEffect, useMemo, useState } from 'react'
import { apiUsingNow, iLine, iShift } from '../../../shared'

interface iSelectLineProps {
  is_back?: boolean
}

export const SelectLine = ({ is_back }: iSelectLineProps) => {
  const { watch } = useFormContext()
  const shiftData: iShift = watch('shift')
  const [loading, setLoading] = useState(false)
  const [lineData, setLineDats] = useState<iLine[]>()

  const query = useMemo(() => {
    let data = `?week=${new Date().getDay() + 1}`

    if (shiftData) data += `&shift=${shiftData}`

    if (is_back) {
      data += '&is_back=true'
    } else {
      data += '&is_back=false'
    }

    return data
  }, [is_back, shiftData])

  useEffect(() => {
    setLoading(true)
    apiUsingNow
      .get<{ result: iLine[] }>(`lines${query}`)
      .then((res) => {
        if (res.data.result) {
          setLineDats(
            res.data.result.map((el) => {
              return { ...el, label: el.route.name }
            }),
          )
        }
      })
      .finally(() => setLoading(false))
  }, [query])

  return (
    <>
      <div style={{ width: '100%' }}>
        <AutocompleteElement
          name="line"
          label="Rota"
          loading={loading}
          options={
            lineData && lineData.length > 0
              ? lineData
              : [
                  {
                    id: 1,
                    label: 'No momento, não há nenhuma rota cadastrada',
                  },
                ]
          }
        />
      </div>
    </>
  )
}
