import React from 'react'
import styled from 'styled-components'

/* eslint react/display-name: 0 */

const DeviceWrapper = styled.div`
  background-image: url('/img/iphone5s.jpg');
  height: 900px;
  padding: 133px 35px 131px 51px;
  width: 450px;
`

type Props = {
  model: any
}

export const deviceContainer = WrappedComponent => ({ model }: Props) => (
  <div>
    <DeviceWrapper>
      <WrappedComponent model={model} />
    </DeviceWrapper>
  </div>
)
