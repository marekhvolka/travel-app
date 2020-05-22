import React from 'react'
import { Col, Row } from 'antd'
import styled from 'styled-components'

type Props = {
  steps: any[]
}

const StepWrapper = styled.div`
  padding: 5px 10px
`

const StepDescription = styled.p`
  color: ${props => props.theme.mutedColor}
`

export const Steps = ({ steps }: Props) => (
  <Row>
    {steps.map(step => (
      <Col xs={24} sm={8} className={'p-0 mb-4'} key={Math.random()}>
        <StepWrapper>
          <h5>
            {step.icon}
            {step.title}
          </h5>
          <StepDescription>{step.text}</StepDescription>
        </StepWrapper>
      </Col>
    ))}
  </Row>
)
