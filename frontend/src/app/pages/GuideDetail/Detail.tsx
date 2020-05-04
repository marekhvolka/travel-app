import { useQuery } from '@apollo/react-hooks'
import { Col, Row } from 'antd'
import gql from 'graphql-tag'
import isNil from 'lodash/isNil'
import React from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Button } from '../../../common/atoms/Button/Button'
import enablePreview from '../../../common/atoms/ImagePreview/enablePreview'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'
import { Text } from '../../../common/atoms/Text/Text'
import { IMAGE_SIZES } from '../../../common/common'
import { State } from '../../../store'

const PreviewImage = enablePreview(ImageWrapper)

const GUIDE_QUERY = gql`
  query fetchGuide($id: String, $url: String) {
    fetchGuide(id: $id, url: $url) {
      id
      name
      url
      previewImageUrl
      description
      price
      currency
    }
  }
`

type MatchParams = {
  url: string
}

export const GuideDetail = (props: RouteComponentProps<MatchParams>) => {
  const userData = useSelector((state: State) => state.userData)

  const { loading, error, data } = useQuery(GUIDE_QUERY, {
    skip: isNil(props.match.params.url),
    variables: {
      url: props.match.params.url
    }
  })

  const onBuy = () => {
    alert('Not implemented')
  }

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  if (!data.fetchGuide) {
    return <div>Loading</div>
  }

  const isBought = true
  const guide = data.fetchGuide

  return (
    <div className={'text-center'}>
      <Row>
        <Col xs={24} sm={12}>
          <PreviewImage size={IMAGE_SIZES.MEDIUM} url={guide.previewImageUrl} className="full-width padding-bottom"/>
        </Col>
        <Col xs={24} sm={12} style={{ padding: '10px' }}>
          <MainHeading>{guide.name}</MainHeading>
          <Text value={guide.description}/>
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
}
