import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'

type Props = {
  steps: any[]
}

const StepWrapper = styled.div`
  padding: 5px 10px
`

const StepDescription = styled.p`
  color: ${props => props.theme.color.muted}
`

export const Steps = ({ steps }: Props) => (
  <Row>
    {steps.map(step => (
      <Col xs={24} sm={8} style={{ padding: '10px' }} key={Math.random()}>
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
