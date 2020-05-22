
type CollectionFormProps = {
  model: any
  modelChanged?: any
  collectionName: string
}

export const CollectionForm = ({model, modelChanged, collectionName}: CollectionFormProps) => {
  const add = addedItem => {
    modelChanged({
      [collectionName]: [...model[collectionName], addedItem],
    })
  }

  const remove = removedItem => {
    modelChanged({
      ...model,
      [collectionName]: model[collectionName].filter((currentItem) => currentItem.id !== removedItem.id)
    })
  }
}
