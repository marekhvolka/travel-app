import React, { useState } from 'react'
import { UploadForm } from '../UploadForm/UploadForm'

type Props = {
  path: string[]
  onClose: any
}

export const UploadFile = (props: Props) => {
  const [upload, setUpload] = useState({
    fileName: '',
    file: null,
  })

  return (
    <UploadForm path={props.path.join('/')} model={upload} onUploadSuccess={props.onClose} onClose={props.onClose} />
  )
}
