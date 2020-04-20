import React, { Component } from 'react'
import axios from 'axios'
import ReactCrop, { makeAspectCrop, ArrayBuffer } from 'react-image-crop'
import { Button } from '../../../common/atoms/Button/Button'
import 'react-image-crop/dist/ReactCrop.css'

type Props = {
  onClose: any
  onUploadSuccess: any
  path: string
  model: any
}

type State = {
  height: number
  width: number
  fileUrl?: string
  src: ArrayBuffer
  crop?: any
}

export class UploadForm extends Component<Props, State> {
  nameInput: any
  fileInput: any
  setFileInputRef: any
  setNameInputRef: any

  aspect = 3 / 2

  constructor(props) {
    super(props)

    this.state = {
      src: null,
      width: null,
      height: null,
      crop: {
        width: 100,
      },
    }
    this.nameInput = null
    this.fileInput = null

    this.setFileInputRef = element => {
      this.fileInput = element
    }
    this.setNameInputRef = element => {
      this.nameInput = element
    }
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  returnCrop = image => {
    const crop = image.width / image.height > this.aspect ? { height: 100 } : { width: 100 }

    return makeAspectCrop(
      {
        x: 0,
        y: 0,
        aspect: this.aspect,
        ...crop,
      },
      image.width / image.height
    )
  }

  onImageLoaded = image => {
    this.setState({
      crop: this.returnCrop(image),
      width: image.width,
      height: image.height,
    })
  }

  updateFile = () => {
    const file = this.fileInput.files[0]

    if (file) {
      this.nameInput.value = file.name
      this.setState({
        fileUrl: URL.createObjectURL(file),
      })

      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () =>
          this.setState({
            src: reader.result,
          }),
        false
      )
      reader.readAsDataURL(file)
    }
  }

  submit = () => {
    const data = new FormData()
    data.append('file', this.fileInput.files[0])
    data.append('filename', this.nameInput.value)
    data.append('path', this.props.path)
    data.append('crop', JSON.stringify(this.state.crop))

    axios
      .post('http://localhost:3000/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response)
        this.props.onUploadSuccess && this.props.onUploadSuccess()
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  }

  onCropComplete = crop => {
    // eslint-disable-next-line no-console
    console.log('onCropComplete', crop)
  }

  render() {
    return (
      <div>
        <h2>
          Upload form
          <Button onClick={this.props.onClose}>Close</Button>
        </h2>
        <input type="text" ref={this.setNameInputRef} />
        <input type="file" ref={this.setFileInputRef} onChange={data => this.updateFile && this.updateFile()} />
        {(this.state.width < 1200 || this.state.height < 800) && (
          <div style={{ border: '2px solid red' }}>
            <h3>
              Warning - image is too small - {this.state.width} px / {this.state.height} px
            </h3>
          </div>
        )}
        {this.state.src && (
          <ReactCrop
            src={this.state.src}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            crop={this.state.crop}
            onChange={this.onCropChange}
          />
        )}
        <Button onClick={this.submit}>Upload</Button>
      </div>
    )
  }
}
