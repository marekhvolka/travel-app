import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'

type Props = {
  steps: any[]
}

const StepsWrapper = styled.div`
  margin-bottom: 50px;
`

const StepWrapper = styled.div`
  padding: 5px 10px;
`

const StepTitle = styled.h5`
  font-size: 20px;
  display: inline-block;
  margin-left: 10px;
`

const StepIcon = styled.span`
  color: #000;
`

const StepDescription = styled.p`
  margin-top: 15px;
  font-size: 13px;
  color: ${props => props.theme.color.muted};
`

export const Steps = ({ steps }: Props) => (
  <StepsWrapper>
    <Row>
      {steps.map(step => (
        <Col xs={24} sm={8} style={{ padding: '10px' }} key={Math.random()}>
          <StepWrapper>
            <StepIcon>
              {step.icon}
            </StepIcon>
            <StepTitle>
              {step.title}
            </StepTitle>
            <StepDescription>{step.text}</StepDescription>
          </StepWrapper>
        </Col>
      ))}
    </Row>
  </StepsWrapper>
)
