import { Component } from 'react'

type CollectionFormProps = {
  model: any
  modelChanged?: any
  collectionName: string
  itemIdsArrayName?: string
}

export class CollectionForm<ChildProps = {}> extends Component<ChildProps & CollectionFormProps, {}> {
  add = item => {
    const changes = {
      [this.props.collectionName]: [...this.props.model[this.props.collectionName], item],
    }

    if (this.props.itemIdsArrayName) {
      changes[this.props.itemIdsArrayName] = [...this.props.model[this.props.itemIdsArrayName], item.id]
    }

    this.props.modelChanged(changes)
  }

  remove = item => {
    const { collectionName, itemIdsArrayName } = this.props
    const model = { ...this.props.model }

    const items = [...model[collectionName]]
    const itemIds = itemIdsArrayName ? [...model[itemIdsArrayName]] : []

    for (let i = 0; i < items.length; i++) {
      if (items[i].id === item.id) {
        items.splice(i, 1)
      }

      if (itemIdsArrayName && itemIds[i] === item.id) {
        itemIds.splice(i, 1)
      }
    }

    // Todo: not necessary?
    // model[collectionName] = items;
    // if (itemIdsArrayName) {
    //     model[itemIdsArrayName] = itemIds;
    // }

    this.props.modelChanged(model)
  }
}
