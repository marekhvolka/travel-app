import { FieldProps } from 'formik'
import React, { useState } from 'react'
import { Form } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import EditorState from 'draft-js/lib/EditorState'
import stateToHTML from 'draft-js-export-html/lib/stateToHTML'
import stateFromHTML from 'draft-js-import-html/lib/stateFromHTML'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

type Props = FieldProps & {
  helperText?: any
  label: string
  name: string
}

export const WysiwygInput = ({ field, form: { setFieldValue, touched, errors }, ...props }: Props) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(stateFromHTML(field.value || ''))
  )

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
    setFieldValue(field.name, stateToHTML(editorState.getCurrentContent()))
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
      {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </Form.Item>
  )
}
