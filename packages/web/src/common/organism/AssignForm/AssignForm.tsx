import { Select } from 'antd'
import { FieldArray } from 'formik'
import React from 'react'
import styled from 'styled-components'
import { Label } from '../../atoms/Label/Label'

type Props = {
  items?: any
  itemIdsArrayName: string
  model: any
}

const AssignedItem = styled(Label)`
  margin-left: 5px;
  margin-bottom: 4px;
  float: left;
  line-height: 20px;
`

export const AssignForm = ({ model, items, itemIdsArrayName }: Props) => (
  <FieldArray name={itemIdsArrayName}>
    {({ push, remove }) => (
      <div>
        {model[itemIdsArrayName].map((itemId, index) => {
          const item = items.find((currentItem) => currentItem._id === itemId)

          if (!item) {
            console.log(itemId)
            return <></>
          }

          return (
            <AssignedItem key={itemId}>
              {item.name} <span onClick={() => remove(index)}>x</span>
            </AssignedItem>
          )
        })
        }
        <Select
          placeholder="Assign an item"
          style={{ width: 200 }}
          onChange={push}
        >
          {items.filter(item => !model[itemIdsArrayName].includes(item._id)).map(item => (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    )}
  </FieldArray>
)
