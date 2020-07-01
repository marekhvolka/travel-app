import React, { useState } from 'react'
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

export const WysiwygInput = (props: Props) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(stateFromHTML(props.value ? props.value : ''))
  )

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
    props.onChange({
      [props.name]: stateToHTML(editorState.getCurrentContent()),
    })
  }

  return (
    <Form.Item label={props.label}>
      <Editor
        editorState={editorState}
        editorStyle={{
          border: '1px solid #eee',
          padding: '0 15px',
        }}
        onEditorStateChange={onEditorStateChange}
      />
      {props.helperText && <p>{props.helperText}</p>}
    </Form.Item>
  )
}
