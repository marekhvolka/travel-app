import { useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import FaTrash from 'react-icons/lib/fa/trash'
import styled from 'styled-components'
import { FlashMessageType, showFlashMessage } from '../../../common/atoms/FlashMessage/FlashMessage'
import { enablePreview } from '../../../common/atoms/ImagePreview/enablePreview'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'
import { IMAGE_SIZES } from '../../../common/common'
import dirImage from './dir.jpg'
import { GalleryToolbar } from './GalleryToolbar'

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

const DELETE = gql`
  mutation($path: String!) {
    delete(path: $path)
  }
`

type Props = {
  onImageSelected?: any
}

const PreviewImage = enablePreview(ImageWrapper)

type ItemPreviewProps = {
  directory?: boolean
}

const ItemPreview = styled.div < ItemPreviewProps > `
  background-image: ${props => (props.directory ? `url(${dirImage})` : '')};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80%;
  height: 150px;
  width: 200px;
`
const GalleryItem = styled.div`
  // border: 1px solid #000;
  float: left;
  height: 220px;
  width: 200px;
`

export const Gallery = ({onImageSelected }: Props) => {
  const client = useApolloClient()
  const [path, setPath] = useState([])
  const [state, setState] = useState({
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
    setPath(currentPath => [...currentPath, dirName])
  }

  const deleteItem = (path, isFile: boolean = true) => {
    client.mutate({
      mutation: DELETE,
      variables: {
        path
      }
    })
    showFlashMessage((isFile ? 'File' : 'Directory') + ' successfully removed', FlashMessageType.SUCCESS)
    queryDirContent()
  }

  const goBack = () => {
    setPath(path.slice(0, -1))
  }

  return (
    <div>
      <MainHeading>Gallery</MainHeading>
      <GalleryToolbar path={path} onGoBack={goBack} onRefresh={queryDirContent}/>
      <div>
        {state.subdirectories.map(item => (
          <GalleryItem key={Math.random()} onClick={() => dirClicked(item.name)}>
            <ItemPreview directory/>
            <p style={{textAlign: 'center'}}>
              {item.name}
              <FaTrash onClick={() => deleteItem(item.path, false)}/>
            </p>
          </GalleryItem>
        ))}

        {state.files.map(item => {
          const [fileName, fileExtension] = item.name.split('.')
          const fileNameAbbreviation = fileName.length > 18 ? `${fileName.substring(0, 15)}...` : fileName

          return (
            <GalleryItem key={Math.random()}>
              <ItemPreview>
                <PreviewImage size={IMAGE_SIZES.MEDIUM} url={item.path} style={{ height: '150px', padding: '5px' }}/>
              </ItemPreview>
              <p style={{ textAlign: 'center' }}>
                <span title={item.name}>
                  {fileNameAbbreviation}.{fileExtension}
                </span>
                <br/>
                {`${Math.floor(item.stats.size / 1024)} KB`}
                <br/>
                <a onClick={() => onImageSelected && onImageSelected(item.path)}>Copy</a>
                <FaTrash onClick={() => deleteItem(item.path)}/>
              </p>
            </GalleryItem>
          )
        })}
        <div style={{ clear: 'both' }}/>
      </div>
    </div>
  )
}
