import React from 'react'
import styled from 'styled-components'
import { enablePreview } from '../../../common/atoms/ImagePreview/enablePreview'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'
import { Text } from '../../../common/atoms/Text/Text'
import { IMAGE_SIZES } from '../../../common/common'
import dirImage from './dir.jpg'
import { GalleryToolbar } from './GalleryToolbar'

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

export const Gallery = ({ path, files, subdirectories, dirClicked, directoryName, goBack, onRefresh, onImageSelected }) => (
  <div>
    <MainHeading>Gallery</MainHeading>
    <GalleryToolbar path={path} onGoBack={goBack} onRefresh={onRefresh}/>
    <div>
      {subdirectories.map(item => (
        <GalleryItem key={Math.random()} onClick={() => dirClicked(item.name)}>
          <ItemPreview directory/>
          <Text textAlign={'center'} value={item.name}/>
        </GalleryItem>
      ))}

      {files.map(item => {
        const [fileName, fileExtension] = item.name.split('.')
        const fileNameAbbreviation = fileName.length > 18 ? `${fileName.substring(0, 15)}...` : fileName

        return (
          <GalleryItem key={Math.random()}>
            <ItemPreview>
              <PreviewImage size={IMAGE_SIZES.MEDIUM} url={item.path} style={{ height: '150px' }}/>
            </ItemPreview>
            <p style={{ textAlign: 'center' }}>
              <span title={item.name}>
                {fileNameAbbreviation}.{fileExtension}
              </span>
              <br/>
              {`${Math.floor(item.stats.size / 1024)} KB`}
              <br/>
              <span onClick={() => onImageSelected && onImageSelected(item.path)}>Copy</span>
            </p>
          </GalleryItem>
        )
      })}
      <div style={{ clear: 'both' }}/>
    </div>
  </div>
)
