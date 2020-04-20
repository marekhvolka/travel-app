import React, { useState } from 'react'
import { WithApolloClient } from 'react-apollo'
import withApollo from 'react-apollo/withApollo'
import gql from 'graphql-tag'
import { Input } from '../../../common/atoms/Input/Input'
import { Button } from '../../../common/atoms/Button/Button'

const CREATE_DIR = gql`
  mutation($name: String!, $path: String!) {
    createDirectory(name: $name, path: $path) {
      name
      path
    }
  }
`

type Props = {
  path: any
  onSuccess: any
  onClose: any
}

const CreateDirectory = (props: WithApolloClient<Props>) => {
  const [directoryName, setDirectoryName] = useState('')

  const createDirectory = () => {
    props.client
      .mutate({
        mutation: CREATE_DIR,
        variables: {
          name: directoryName,
          path: props.path.join('/'),
        },
      })
      .then(() => {
        props.onSuccess()
      })
  }

  return (
    <div>
      <Button onClick={props.onClose}>Close</Button>
      <Input value={directoryName} onChange={input => setDirectoryName(input.value)} />
      <Button onClick={createDirectory}>Create</Button>
    </div>
  )
}

export default withApollo(CreateDirectory)
