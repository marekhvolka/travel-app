import React from 'react'
import Link from 'react-router-dom/Link'
import { Col, Row } from 'antd'
import styled from 'styled-components'
import { Text } from '../../../common/atoms/Text/Text'
import { Button } from '../../../common/atoms/Button/Button'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { IMAGE_SIZES } from '../../../common/common'

type Props = {
  guides: any[]
}

const GuideWrapper = styled.div`
  border: 1px solid ${props => props.theme.border.color};
  border-radius: 5px
  margin-bottom: 20px
`

export const Guides = ({ guides }: Props) => (
  <div>
    <h2 style={{textAlign: 'center'}}>Choose from our guides</h2>
    <div>
      {guides.map(guide => (
        <Link key={guide.id} to={`/guides/${guide.url}`}>
          <GuideWrapper>
            <Row>
              <Col xs={24} md={8}>
                <ImageWrapper
                  size={IMAGE_SIZES.MEDIUM}
                  url={guide.previewImageUrl}
                  className="full-width padding-bottom"
                />
              </Col>
              <Col xs={24} md={16}>
                <div style={{textAlign: 'center', padding: '5px 10px'}}>
                  <h3 className={'m-2'}>{guide.name}</h3>
                  <Text value={guide.description} />
                  <span>Price: {`${guide.price} ${guide.currency}`}</span>
                  &nbsp;
                  <Button>Detail</Button>
                </div>
              </Col>
            </Row>
          </GuideWrapper>
        </Link>
      ))}
    </div>
  </div>
)
