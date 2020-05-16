import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { Button } from '../../../common/atoms/Button/Button'
import { Input } from '../../../common/atoms/Input/Input'

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

export const CreateDirectory = (props: Props) => {
  const [directoryName, setDirectoryName] = useState('')
  const [createDirectoryMutation] = useMutation(CREATE_DIR)

  const createDirectory = () => {
    createDirectoryMutation({
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
      <Input value={directoryName} onChange={input => setDirectoryName(input.value)}/>
      <Button onClick={createDirectory}>Create</Button>
    </div>
  )
}
