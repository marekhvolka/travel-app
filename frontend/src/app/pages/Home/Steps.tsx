import React from 'react'
import { Col, Row } from 'antd'
import { Box } from '../../../common/atoms/Box/Box'

type Props = {
  steps: any[]
}

export const Steps = ({ steps }: Props) => (
  <Row className="show-grid">
    {steps.map(step => (
      <Col xs={24} sm={8} className={'p-0 mb-4'} key={Math.random()}>
        <Box>
          <h4>
            {step.icon}
            {step.title}
          </h4>
          <p>{step.text}</p>
        </Box>
      </Col>
    ))}
  </Row>
)
