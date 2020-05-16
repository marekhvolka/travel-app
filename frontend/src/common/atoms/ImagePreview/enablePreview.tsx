import React, { useState, ComponentType } from 'react'
import { Lightbox } from 'react-modal-image'
import { getImageUrl, IMAGE_SIZES } from '../../common'

type Props = {
  url: string
}

/* eslint react/display-name: 0 */
export const enablePreview = <ChildProps extends object>(WrappedComponent: ComponentType<ChildProps>) => {
  return (props: ChildProps & Props) => {
    const [isOpen, setIsOpen] = useState(false)

    const closeLightBox = () => {
      setIsOpen(false)
    }

    return (
      <div onClick={() => setIsOpen(true)}>
        <WrappedComponent {...props} />
        {isOpen && <Lightbox large={getImageUrl(IMAGE_SIZES.LARGE, props.url)} onClose={closeLightBox} />}
      </div>
    )
  }
}
