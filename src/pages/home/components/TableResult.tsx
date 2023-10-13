import { TableRow, TableCell } from '@mui/material'
import { useMemo } from 'react'
import sortArray from 'sort-array'
import {
  TableBase,
  iAction,
  iHeadCell,
  useParamsContext,
} from '../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

interface iTableResultProps {
  listData: iAction[]
  handleResult: (newResult: iAction) => void
}

export const TableResult = ({ listData, handleResult }: iTableResultProps) => {
  const { order, by } = useParamsContext()

  const headCells: iHeadCell[] = [
    { order: 'created_at', numeric: 'left', label: 'Aconteceu' },
    { order: 'description', numeric: 'left', label: 'Descrição' },
    { order: 'user_name', numeric: 'left', label: 'Responsável' },
  ]

  const data = useMemo(() => {
    let listFreq: iAction[]

    if (order === 'user_name')
      listFreq = sortArray<iAction>(listData, {
        by: order,
        order: by,
        computed: { user_name: (row) => row.user.name },
      })

    listFreq = sortArray<iAction>(listData, {
      by: order,
      order: by,
    })

    return listFreq
  }, [by, listData, order])

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow
          key={el.id}
          hover
          sx={{ cursor: 'pointer' }}
          onClick={() => handleResult(el)}
        >
          <TableCell>{dayjs(el.created_at).fromNow()}</TableCell>
          <TableCell>{el.description}</TableCell>
          <TableCell>{el.user.name}</TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
