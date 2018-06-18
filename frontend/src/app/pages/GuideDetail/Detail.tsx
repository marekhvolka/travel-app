import React from 'react'
import Link from 'react-router-dom/Link'
import {Col, Row} from "antd";
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import enablePreview from '../../../common/atoms/ImagePreview/enablePreview'
import { IMAGE_SIZES } from '../../../common/common'
import { Button } from '../../../common/atoms/Button/Button'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'
import { Text } from '../../../common/atoms/Text/Text'

const PreviewImage = enablePreview(ImageWrapper)

type Props = {
  guide: any
  onBuy: any
  isBought: boolean
}

export const GuideDetail = ({ isBought, guide, onBuy }: Props) => (
  <div className={'text-center'}>
    <MainHeading>{guide.name}</MainHeading>
    <Row>
      <Col xs={24} sm={12}>
        <PreviewImage
          size={IMAGE_SIZES.MEDIUM}
          url={guide.previewImageUrl}
          className="full-width padding-bottom"
        />
      </Col>
      <Col xs={24} sm={12}>
        <Text value={guide.description} />
        <Button m={'10px'}>
          <Link to={`/guides/${guide.url}/explore`}>Try it for free</Link>
        </Button>
        {isBought ? (
          <span>Bought</span>
        ) : (
          <Button onClick={onBuy}>
            Buy for {guide.price} {guide.currency}
          </Button>
        )}
      </Col>
    </Row>
  </div>
)
