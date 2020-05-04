import { Table } from 'antd'
import React from 'react'
import Link from 'react-router-dom/Link'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { IMAGE_SIZES } from '../../../common/common'

export enum ColumnTypes {
  BOOLEAN,
  HTML,
  IMAGE,
}

type RowAction = {
  label: any
  link?: string
  action?: (item) => any
}

type Props = {
  fields: any[]
  items: any[]
  rowActions: (item: any) => RowAction[]
}

export const DataTable = ({ fields, items, rowActions }: Props) => {
  const columns = fields.map(field => {
    return {
      title: field.label,
      dataIndex: field.name,
      key: field.name,
      render: (value, row) => {
        return getTableCell(value, field, '')
      },
    }
  })

  columns.push({
    title: '',
    dataIndex: '',
    key: 'action',
    render: (item, row) => (
      <>
        {rowActions(row).map(rowAction => (
          (rowAction.link ? (
            <Link key={rowAction.link} to={rowAction.link}>
              {rowAction.label}
            </Link>
          ) : (
            <span onClick={() => rowAction.action(item)}>{rowAction.label}</span>
          ))
        ))}
      </>
    )
  })

  return <Table columns={columns} dataSource={items}/>
}

const getTableCell = (value: string, field, key) => {
  let content

  switch (field.type) {
    case ColumnTypes.BOOLEAN:
      content = value ? 'Yes' : 'No'
      break
    case ColumnTypes.IMAGE:
      content = <ImageWrapper size={IMAGE_SIZES.SMALL} style={{ width: '200px' }} url={value}/>
      break
    case ColumnTypes.HTML:
      return <td key={key} dangerouslySetInnerHTML={{ __html: content }}/>

    default:
      content = value
  }

  return <td key={key}>{content}</td>
}
