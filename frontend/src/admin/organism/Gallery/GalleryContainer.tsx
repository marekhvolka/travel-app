import { useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import { Gallery } from './Gallery'

const QUERY = gql`
  query($path: String!) {
    dir(path: $path) {
      name
      subdirectories {
        name
        path
      }
      files {
        name
        path
        stats {
          size
        }
      }
    }
  }
`

type Props = {
  onImageSelected?: any
}

export const GalleryContainer = (props: Props) => {
  const client = useApolloClient()
  const [path, setPath] = useState([])
  const [state, setState] = useState({
    directoryName: null,
    subdirectories: [],
    files: []
  })

  useEffect(() => {
    queryDirContent()
  }, [path])

  const queryDirContent = async () => {
    const result = await client.query({
      query: QUERY,
      variables: {
        path: path.join('/'),
      },
      fetchPolicy: 'network-only',
    })

    setState({
      ...state,
      subdirectories: result.data.dir.subdirectories,
      files: result.data.dir.files,
    })
  }

  const dirClicked = dirName => {
    setPath([...path, dirName])
  }

  const goBack = () => {
    setPath(path.slice(0, -1))
  }

  return (
    <div>
      <Gallery
        onImageSelected={props.onImageSelected}
        path={path}
        files={state.files}
        subdirectories={state.subdirectories}
        dirClicked={dirClicked}
        directoryName={state.directoryName}
        goBack={goBack}
        onRefresh={queryDirContent}
      />
    </div>
  )
}
