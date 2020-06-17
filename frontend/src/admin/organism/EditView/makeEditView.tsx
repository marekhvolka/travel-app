import { useMutation, useQuery } from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { FlashMessageType, showFlashMessage } from '../../../common/atoms/FlashMessage/FlashMessage'
import { Spinner } from '../../../common/atoms/Spinner/Spinner'
import { removeKeys } from '../../../common/common'

type EditViewOptions = {
  query: DocumentNode
  queryName: string
  queryNewObject?: DocumentNode
  queryNewObjectName?: string
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
    const { loading, error, data } = useQuery(params.id ? options.query : options.queryNewObject, params.id ? {
      variables: { id: params.id }
    } : {})
    const [updateMutation, { loading: mutationLoading }] = useMutation(options.mutation)
    const [model, setModel] = useState(data ? data[params.id ? options.queryName : options.queryNewObjectName] : options.initialModel || {})

    useEffect(() => {
      setModel(data ? data[params.id ? options.queryName : options.queryNewObjectName] : {})
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
      return <Spinner/>
    }

    if (error) {
      return <div>Error</div>
    }

    return (
      <>
        {mutationLoading && <Spinner />}
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
      </>
    )
  }

  return FinalComponent
}
