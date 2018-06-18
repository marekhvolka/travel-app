import React from 'react'
import Link from 'react-router-dom/Link'
import { Col, Row } from 'antd'
import { Text } from '../../../common/atoms/Text/Text'
import { Button } from '../../../common/atoms/Button/Button'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { IMAGE_SIZES } from '../../../common/common'

type Props = {
  guides: any[]
}

export const Guides = ({ guides }: Props) => (
  <div>
    <h2 className={'text-center'}>Choose from our guides</h2>
    <div>
      {guides.map(guide => (
        <Link key={guide.id} to={`/guides/${guide.url}`}>
          <Row className="show-grid border rounded p-2 mb-3">
            <Col xs={24} md={8}>
              <ImageWrapper
                size={IMAGE_SIZES.MEDIUM}
                url={guide.previewImageUrl}
                className="full-width padding-bottom"
              />
            </Col>
            <Col xs={24} md={16}>
              <div className={'text-center'}>
                <h3 className={'m-2'}>{guide.name}</h3>
                <Text value={guide.description} />
                <span>Price: {`${guide.price} ${guide.currency}`}</span>
                &nbsp;
                <Button>Detail</Button>
              </div>
            </Col>
          </Row>
        </Link>
      ))}
    </div>
  </div>
)
