import React from 'react'
import styled from 'styled-components'
import { MapViewer } from '../Map/MapViewer'

const GuideViewerWrapper = styled.div`
  width: 100%;
  height: 100%;

  * {
    //font-family: 'Libre Baskerville', serif;
  }

  @media only screen and (min-width: 600px) {
    //min-height: 800px;
  }
`

const MainContent = styled.div`
  padding: 0 20px 20px;
  height: 91%;
`

type Props = {
  model: any
}

const GuideViewer = (props: Props) => {
  return (
    <GuideViewerWrapper>
      <MainContent>
        <MapViewer model={props.model} />
      </MainContent>
    </GuideViewerWrapper>
  )
}

export default GuideViewer
