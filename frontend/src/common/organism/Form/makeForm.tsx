import React from 'react'

// type Props = {
//   model: any
//   modelChanged: any
// }

export const makeForm = WrappedForm => (props: any) => {

  const onChange = (newValues) => {
    props.modelChanged({
      ...props.model,
      ...newValues
    })
  }

  return <WrappedForm {...props} onChange={onChange} />
}
