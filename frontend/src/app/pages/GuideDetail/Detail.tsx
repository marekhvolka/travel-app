import { useQuery } from '@apollo/react-hooks'
import { Col, Row } from 'antd'
import gql from 'graphql-tag'
import isNil from 'lodash/isNil'
import React from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Button } from '../../../common/atoms/Button/Button'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'
import { Text } from '../../../common/atoms/Text/Text'
import { IMAGE_SIZES } from '../../../common/common'
import { State } from '../../../store'

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
    <div style={{marginTop: '20px'}}>
      <Row>
        <Col xs={24} sm={8}>
          <ImageWrapper size={IMAGE_SIZES.MEDIUM} url={guide.previewImageUrl} />
        </Col>
        <Col xs={24} sm={16} style={{ padding: '20px' }}>
          <MainHeading left>{guide.name}</MainHeading>
          <Text value={guide.description} textAlign={'justify'} />
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
