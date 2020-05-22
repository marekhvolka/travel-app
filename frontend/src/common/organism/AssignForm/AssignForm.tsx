import React  from 'react'
import styled from 'styled-components'
import { Label } from '../../atoms/Label/Label'
import { Select } from 'antd'

type Props = {
  items?: any
  itemIdsArrayName: string
  model: any
  modelChanged: any
}

const AssignedItem = styled(Label)`
  margin-left: 5px
  margin-bottom: 4px
  float: left
  line-height: 20px
`

export const AssignForm = ({model, items, itemIdsArrayName, modelChanged} : Props) => {
  const add = (itemId: string) => {
    modelChanged({
      [itemIdsArrayName]: [...model[itemIdsArrayName], itemId]
    })
  }

  const remove = (itemId: string) => {
    modelChanged({
      ...model,
      [itemIdsArrayName]: model[itemIdsArrayName].filter((currentItemId) => currentItemId !== itemId)
    })
  }

  return (
    <div>
      {model[itemIdsArrayName].map(itemId => {
        const item = items.find((currentItem) => currentItem.id === itemId)

        if (!item) {
          console.log(itemId)
          return <></>
        }

        return (
          <AssignedItem key={itemId}>
            {item.name} <span onClick={() => remove(itemId)}>x</span>
          </AssignedItem>
        )
      })}
      <Select
        placeholder="Assign an item"
        style={{ width: 200 }}
        onChange={add}
      >
        {items
          .filter(item => !model[itemIdsArrayName].includes(item.id))
          .map(item => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
      </Select>
    </div>
  )
}
