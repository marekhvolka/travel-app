import React from 'react'

type Props = {
  value: string
}

export const Text = ({ value, ...restProps }: Props) => (
  <p
    {...restProps}
    dangerouslySetInnerHTML={{
      __html: value,
    }}
  />
)
