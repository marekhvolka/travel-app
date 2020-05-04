import React, { useEffect, useState } from 'react'
import { compose, graphql } from 'react-apollo'
import isNil from 'lodash/isNil'
import { FlashMessageType, showFlashMessage } from '../../../common/atoms/FlashMessage/FlashMessage'
import { removeKeys } from '../../../common/common'

// const optionsStructure = {
//   query: 'SOME GQL QUERY',
//   queryName: 'fetchCity',
//   mutation: 'SOME GQL MUTATION',
//   mutationName: 'updateCity',
//   slug: 'cities'
// }

type Props = {
  update: any
  history: any
  match: any
  fetch: any
}

export const makeEditView = (WrappedComponent, options) => {
  const FinalComponent = (props: Props) => {
    const [model, setModel] = useState(props.fetch ? props.fetch[options.queryName] : {})

    useEffect(() => {
      setModel(props.fetch ? props.fetch[options.queryName] : {})
    }, [props])

    const handleSubmit = () => {
      props
        .update({
          variables: {
            data: removeKeys({ ...model }),
          },
        })
        .then(data => {
          if (!model.id) {
            showFlashMessage('Item successfully created', FlashMessageType.SUCCESS)
            const redirectUrl = `/${options.slug}/edit/${data.data[options.mutationName].id}`
            props.history.push(redirectUrl)
          } else {
            showFlashMessage('Item successfully changed', FlashMessageType.SUCCESS)
          }
        })
    }

    if (props.fetch && (props.fetch.loading || !model)) {
      return <div>Loading</div>
    }

    if (props.fetch && props.fetch.error) {
      return <div>Error</div>
    }

    return (
      <WrappedComponent
        model={model}
        modelChanged={updatedFields =>
          setModel({
            ...model,
            ...updatedFields,
          })
        }
        handleSubmit={handleSubmit}
      />
    )
  }

  return compose(
    graphql(options.query, {
      name: 'fetch',
      skip: (props: Props) => isNil(props.match.params.id),
      options: (props: Props) => ({ variables: { id: props.match.params.id } }),
    }),
    graphql(options.mutation, {
      name: 'update',
    })
  )(FinalComponent)
}
