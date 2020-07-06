import { FieldProps } from 'formik'
import React, { useState } from 'react'
import Modal from 'react-modal'
import { Flex } from '../Flex/Flex'
import { Box } from '../Box/Box'
import { Gallery } from '../../../admin/organism/Gallery/Gallery'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'
import { IMAGE_SIZES } from '../../common'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'

type Props = FieldProps & {
  type?: string
  label?: string
  placeholder?: string
}

export const ImageInput = React.memo((props: Props) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const onImageSelected = (path: string) => {
    props.form.setFieldValue(props.field.name, path)
    setIsGalleryOpen(false)
  }

  return (
      <div>
        <Flex>
          <Box flex={4}>
            <Input {...props} />
          </Box>
          <Box flex={1}>
            <Button onClick={() => setIsGalleryOpen(true)}>Gallery</Button>
          </Box>
        </Flex>
        <ImageWrapper size={IMAGE_SIZES.MEDIUM} url={props.field.value} style={{ maxWidth: '500px' }} />

        <Modal isOpen={isGalleryOpen} onRequestClose={() => setIsGalleryOpen(false)} contentLabel="Example Modal">
          <Gallery onImageSelected={onImageSelected} />
        </Modal>
      </div>
    )
  }
)
