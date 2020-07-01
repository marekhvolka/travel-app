import { Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { IMAGE_SIZES } from '../../../common/common'

export enum ColumnTypes {
  BOOLEAN,
  HTML,
  IMAGE,
}

type Field = {
  label: string
  name: string
  type?: ColumnTypes
}

type RowAction = {
  label: any
  link?: string
  action?: (item) => any
}

type Props = {
  fields: Field[]
  items: any[]
  rowActions: (item: any) => RowAction[]
}

export const DataTable = ({ fields, items, rowActions }: Props) => {
  const columns = fields.map(field => {
    return {
      title: field.label,
      dataIndex: field.name,
      render: (value, row) => getTableCell(value, field)
    }
  })

  columns.push({
    title: '',
    dataIndex: '',
    render: (item, row) => (
      <>
        {rowActions(row).map(rowAction => (
          (rowAction.link ? (
            <Link key={rowAction.link} to={rowAction.link}>
              {rowAction.label}
            </Link>
          ) : (
            <span style={{ margin: '0 5px' }} onClick={() => rowAction.action(item)}>{rowAction.label}</span>
          ))
        ))}
      </>
    )
  })

  return <Table rowKey="id" columns={columns} dataSource={items.map((item) => ({ ...item, key: item.id }))}/>
}

const getTableCell = (value: string, field: Field) => {
  let content

  switch (field.type) {
    case ColumnTypes.BOOLEAN:
      content = value ? 'Yes' : 'No'
      break
    case ColumnTypes.IMAGE:
      content = <ImageWrapper size={IMAGE_SIZES.SMALL} style={{ width: '200px' }} url={value}/>
      break
    case ColumnTypes.HTML:
      return <span dangerouslySetInnerHTML={{ __html: value }}/>

    default:
      content = value
  }

  return <span>{content}</span>
}
