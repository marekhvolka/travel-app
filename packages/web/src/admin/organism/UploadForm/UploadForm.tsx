import { Input, Modal } from 'antd'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import ReactCrop, { ArrayBuffer, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { config } from '../../../config'

type Props = {
  onClose: any
  path: string
}

type State = {
  height: number
  width: number
  fileUrl?: string
  src: ArrayBuffer
  crop: any
}

export const UploadForm = ({ onClose, path }: Props) => {
  const [fileName, setFileName] = useState('')
  const [state, setState] = useState<State>({
    src: null,
    width: null,
    height: null,
    crop: {
      width: 100,
    },
  })
  const fileRef = useRef(undefined)

  const aspect = 3 / 2

  const onCropChange = crop => {
    setState({
      ...state,
      crop
    })
  }

  const returnCrop = image => {
    const crop = image.width / image.height > aspect ? { height: 100 } : { width: 100 }

    return makeAspectCrop(
      {
        x: 0,
        y: 0,
        aspect,
        ...crop,
      },
      image.width / image.height
    )
  }

  const onImageLoaded = image => {
    setState({
      ...state,
      crop: returnCrop(image),
      width: image.width,
      height: image.height,
    })
  }

  const updateFile = () => {
    const file = fileRef.current.files[0]

    if (file) {
      setFileName(file.name)
      setState({
        ...state,
        fileUrl: URL.createObjectURL(file),
      })

      const reader = new FileReader()
      reader.addEventListener('load', () => setState({
          ...state,
          src: reader.result,
        }),
        false
      )
      reader.readAsDataURL(file)
    }
  }

  const submit = () => {
    const data = new FormData()
    data.append('file', fileRef.current.files[0])
    data.append('filename', fileName)
    data.append('path', path)
    data.append('crop', JSON.stringify(state.crop))

    axios
      .post(config.backendUrl + '/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response)
        onClose()
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  }

  const onCropComplete = crop => {
    // eslint-disable-next-line no-console
    console.log('onCropComplete', crop)
  }

  return (
    <Modal
      visible={true}
      title="Upload file form"
      onCancel={onClose}
      onOk={submit}
      okText="Upload"
    >
      <input type="file" ref={fileRef} onChange={data => updateFile()}/>
      {state.width && state.height && (state.width < 1200 || state.height < 800) && (
        <div style={{ padding: '10px 20px' }}>
          <h3>
            Warning - image is too small - {state.width} px / {state.height} px
          </h3>
        </div>
      )}
      {state.src && (
        <>
          <Input placeholder="Image name" value={fileName} onChange={(event) => setFileName(event.target.value)}/>
          <ReactCrop
            src={state.src}
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            crop={state.crop}
            onChange={onCropChange}
          />
        </>
      )}
    </Modal>
  )
}
