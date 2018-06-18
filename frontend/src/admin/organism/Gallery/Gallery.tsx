import React from 'react'
import styled from 'styled-components'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import enablePreview from '../../../common/atoms/ImagePreview/enablePreview'
import { IMAGE_SIZES } from '../../../common/common'
import {MainHeading} from "../../../common/atoms/MainHeading/MainHeading";
import {GalleryToolbar} from "./GalleryToolbar";

const PreviewImage = enablePreview(ImageWrapper)

type Props = {
  directory?: boolean
}

const ItemPreview = styled.div<Props>`
  background-image: ${props => (props.directory ? "url('/img/dir.jpeg')" : '')};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80%;
  height: 150px;
  width: 200px;
`
const GalleryItem = styled.div`
  border: 1px solid #000;
  float: left;
  height: 220px;
  width: 200px;
`

export const Gallery = ({
  path,
  files,
  subdirectories,
  dirClicked,
  directoryName,
  goBack,
  onRefresh,
}) => (
  <div>
    <MainHeading>Gallery</MainHeading>
    <GalleryToolbar path={path} onGoBack={goBack} onRefresh={onRefresh}/>
    <div>
      {subdirectories.map(item => (
        <GalleryItem key={Math.random()} onClick={() => dirClicked(item.name)}>
          <ItemPreview directory />
          <p className={'text-center'}>{item.name}</p>
        </GalleryItem>
      ))}

      {files.map(item => {
        const [fileName, fileExtension] = item.name.split('.')
        const fileNameAbbreviation =
          fileName.length > 18 ? `${fileName.substring(0, 15)}...` : fileName

        return (
          <GalleryItem key={Math.random()}>
            <ItemPreview>
              <PreviewImage
                size={IMAGE_SIZES.MEDIUM}
                url={item.path}
                style={{ height: '150px' }}
              />
            </ItemPreview>
            <p className={'text-center'}>
              <span title={item.name}>
                {fileNameAbbreviation}.{fileExtension}
              </span>
              <br />
              {`${Math.floor(item.size / 1024)} KB`}
              <br />
              <span
                // onClick={() => onImageSelected && onImageSelected(item.path)}
              >
                Copy
              </span>
            </p>
          </GalleryItem>
        )
      })}
      <div style={{ clear: 'both' }} />
    </div>
  </div>
)
