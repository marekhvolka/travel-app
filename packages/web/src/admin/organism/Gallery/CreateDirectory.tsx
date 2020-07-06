import { useMutation } from '@apollo/react-hooks'
import { Input, Modal } from 'antd'
import gql from 'graphql-tag'
import React, { useState } from 'react'

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

  const createDirectory = async () => {
    await createDirectoryMutation({
      variables: {
        name: directoryName,
        path: props.path.join('/'),
      },
    })

    props.onSuccess()
  }

  return (
    <Modal
      title="Create directory form"
      visible={true}
      okText="Create directory"
      onOk={createDirectory}
      onCancel={props.onClose}
    >
      <Input
        placeholder="Directory name"
        value={directoryName}
        name="dirInput"
        onChange={event => setDirectoryName(event.target.value)}
      />
    </Modal>
  )
}
