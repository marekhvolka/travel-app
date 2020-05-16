import { useMutation, useQuery } from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'
import isNil from 'lodash/isNil'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { FlashMessageType, showFlashMessage } from '../../../common/atoms/FlashMessage/FlashMessage'
import { removeKeys } from '../../../common/common'

type EditViewOptions = {
  query: DocumentNode
  queryName: string
  mutation: DocumentNode
  mutationName: string
  slug: string,
  initialModel?: any
}

type MatchParams = {
  id: string
}

export type EditViewProps = {
  model: any
  modelChanged: any
  handleSubmit: any
}

export const makeEditView = (WrappedComponent, options: EditViewOptions) => {
  const FinalComponent = (props) => {
    const params = useParams<MatchParams>()
    const history = useHistory()
    const { loading, error, data } = useQuery(options.query, {
      skip: isNil(params.id),
      variables: { id: params.id }
    })
    const [updateMutation] = useMutation(options.mutation)
    const [model, setModel] = useState(data ? data[options.queryName] : options.initialModel || {})

    useEffect(() => {
      setModel(data ? data[options.queryName] : {})
    }, [data])

    const handleSubmit = async () => {
      const data = await updateMutation({
        variables: {
          data: removeKeys({ ...model }),
        },
      })

      if (!model.id) {
        showFlashMessage('Item successfully created', FlashMessageType.SUCCESS)
        const redirectUrl = `/${options.slug}/edit/${data.data[options.mutationName].id}`
        history.push(redirectUrl)
      } else {
        showFlashMessage('Item successfully changed', FlashMessageType.SUCCESS)
      }
    }

    if (loading || !model) {
      return <div>Loading</div>
    }

    if (error) {
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

  return FinalComponent
}
