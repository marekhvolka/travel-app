import React, { Component } from 'react'
import { Form } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import EditorState from 'draft-js/lib/EditorState'
import stateToHTML from 'draft-js-export-html/lib/stateToHTML'
import stateFromHTML from 'draft-js-import-html/lib/stateFromHTML'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

type Props = {
  helperText?: any
  label: string
  name: string
  onChange: any
  value: string
}

export class WysiwygInput extends Component<Props, {}> {
  state = {
    editorState: EditorState.createEmpty(),
  }

  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createWithContent(
        stateFromHTML(props.value ? props.value : '')
      ),
    }
  }

  onEditorStateChange = editorState => {
    const oldValue = stateToHTML(this.state.editorState.getCurrentContent())

    this.setState(
      {
        editorState,
      },
      () => {
        const value = stateToHTML(this.state.editorState.getCurrentContent())
        value !== oldValue &&
          this.props.onChange({
            [this.props.name]: value,
          })
      }
    )
  }

  render() {
    const { label, helperText } = this.props

    return (
      <Form.Item label={label}>
        <Editor
          editorState={this.state.editorState}
          editorStyle={{
            border: '1px solid #eee',
            padding: '0 15px',
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
        {helperText && (
          <p>{helperText}</p>
        )}
      </Form.Item>
    )
  }
}
