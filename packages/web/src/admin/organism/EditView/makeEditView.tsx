import { useMutation, useQuery } from '@apollo/react-hooks'
import { Formik, Form } from 'formik'
import { DocumentNode } from 'graphql'
import React, { useCallback, useEffect, useState } from 'react'
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
  validate?: any
}

type MatchParams = {
  id: string
}

export type EditViewProps = {
  model: any
  modelChanged?: any
  handleSubmit?: any
}

export const makeEditView = (WrappedComponent, options: EditViewOptions) => {
  const FinalComponent = (props) => {
    const params = useParams<MatchParams>()
    const history = useHistory()
    const { loading, error, data } = useQuery(params.id ? options.query : options.queryNewObject, params.id ? {
      variables: { id: params.id }
    } : {})
    const [updateMutation, { loading: mutationLoading }] = useMutation(options.mutation)
    const [model, setModel] = useState(data ? data[params.id ? options.queryName : options.queryNewObjectName] : null)

    useEffect(() => {
      setModel(data ? data[params.id ? options.queryName : options.queryNewObjectName] : {})
    }, [data, params.id])

    const handleSubmit = async (values) => {
      const data = await updateMutation({
        variables: {
          data: removeKeys({ ...values }),
        },
      })

      if (!values.id) {
        showFlashMessage('Item successfully created', FlashMessageType.SUCCESS)
        const redirectUrl = `/${options.slug}/edit/${data.data[options.mutationName]._id}`
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
        {mutationLoading && <Spinner/>}
        <Formik
          validate={options.validate}
          enableReinitialize={true}
          initialValues={model}
          onSubmit={handleSubmit}
        >
          {({values}) => (
            <Form>
              <WrappedComponent
                model={values}
                handleSubmit={handleSubmit}
              />
            </Form>
          )}
        </Formik>
      </>
    )
  }

  return FinalComponent
}
