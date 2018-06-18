import React from 'react'
import { Label } from '../../atoms/Label/Label'
import { CollectionForm } from '../../../admin/organism/DynamicForm/CollectionForm'
import {Select} from "antd";

type Props = {
  items?: any
}

export class AssignForm extends CollectionForm<Props> {
  render() {
    const { model, items, collectionName, itemIdsArrayName } = this.props

    return (
      <div>
        {model[collectionName].map(item => (
          <Label
            key={item.id}
            style={{
              marginLeft: '5px',
              float: 'left',
              lineHeight: '20px',
              marginBottom: '4px',
            }}
          >
            {item.name} <span onClick={() => this.remove(item)}>x</span>
          </Label>
        ))}
        <Select
          placeholder="Assign an item"
          style={{ width: 200 }}
          onChange={(value) => this.add(items.find((item) => item.id === value))}
        >
          {items
            .filter(item => !model[itemIdsArrayName]
              .includes(item.id))
            .map(item => (
                <Select.Option key={item.id} value={item}>{item.name}</Select.Option>
            ))
          }
        </Select>
      </div>
    )
  }
}
