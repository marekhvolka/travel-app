import React  from 'react'

type Props = {
  model: any
  modelChanged: any
}

export const makeForm = WrappedForm => (props : Props) => {

  const onChange = (newValues) => {
    props.modelChanged({
      ...props.model,
      ...newValues
    })
  }

  return <WrappedForm {...props} onChange={onChange} />
}
