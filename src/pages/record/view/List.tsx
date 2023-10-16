import sortArray from 'sort-array'
import { useMemo } from 'react'
import {
  TableBase,
  TableCellLink,
  TableRowLink,
  iHeadCell,
  iRecord,
  statusPtBr,
  useParamsContext,
} from '../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

interface iViewRecordPageProps {
  listData: iRecord[]
}

export const ViewRecordPage = ({ listData }: iViewRecordPageProps) => {
  const { order, by, onClickReset, handleBack, back } = useParamsContext()

  const onClickDetail = () => {
    handleBack(back, '/record')
    onClickReset()
  }

  const data = useMemo(() => {
    let listReq: iRecord[]

    if (order === 'period_name')
      listReq = sortArray<iRecord>(listData, {
        by: order,
        order: by,
        computed: { period_name: (row) => row.period.name },
      })

    if (order === 'user_name')
      listReq = sortArray<iRecord>(listData, {
        by: order,
        order: by,
        computed: { user_name: (row) => row.user.name },
      })

    if (order === 'user_cpf')
      listReq = sortArray<iRecord>(listData, {
        by: order,
        order: by,
        computed: { user_cpf: (row) => row.user.cpf },
      })

    listReq = sortArray<iRecord>(listData, {
      by: order,
      order: by,
    })

    return listReq
  }, [by, listData, order])

  const headCells: iHeadCell[] = [
    { order: 'created_at', numeric: 'left', label: 'Solicitado' },
    { order: 'period_name', numeric: 'left', label: 'Período' },
    { order: 'user_name', numeric: 'left', label: 'Nome Completo' },
    { order: 'user_cpf', numeric: 'left', label: 'CPF' },
    { order: 'status', numeric: 'left', label: 'Estado' },
  ]

  return (
    <TableBase headCells={headCells} link="div">
      {data.map((el) => (
        <TableRowLink
          key={el.key}
          href={`/record/${el.key}`}
          onClick={onClickDetail}
        >
          <TableCellLink link="div">
            {dayjs(el.created_at).fromNow()}
          </TableCellLink>
          <TableCellLink link="div">{el.period.name}</TableCellLink>
          <TableCellLink link="div">{el.user.name}</TableCellLink>
          <TableCellLink link="div">{el.user.cpf}</TableCellLink>
          <TableCellLink link="div">{statusPtBr(el.status)}</TableCellLink>
        </TableRowLink>
      ))}
    </TableBase>
  )
}
