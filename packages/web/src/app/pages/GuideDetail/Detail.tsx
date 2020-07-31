import { useQuery } from '@apollo/react-hooks'
import { Col, Row } from 'antd'
import gql from 'graphql-tag'
import isNil from 'lodash/isNil'
import React from 'react'
import { Guide } from '@md/common'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../../../common/atoms/Button/Button'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { Text } from '../../../common/atoms/Text/Text'
import { IMAGE_SIZES } from '../../../common/common'
import { State } from '../../../store'
import { UseVoucherButton } from '../../organism/UseVoucherButton/UseVoucherButton'

const GuideTitle = styled.h1`
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 0px;
`

const GuideDescription = styled(Text)`
  font-size: 14px;
  line-height: 25px;
  text-align: justify;
`

const GUIDE_QUERY = gql`
  query fetchGuide($id: String, $url: String) {
    fetchGuide(id: $id, url: $url) {
      _id
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

  const guide: Guide = data.fetchGuide
  const isBought = userData && userData.unlockedGuides && userData.unlockedGuides.find((unlockedGuideData) => unlockedGuideData.guideId === guide._id)

  return (
    <div style={{ marginTop: '20px' }}>
      <Row>
        <Col xs={24} sm={8}>
          <ImageWrapper size={IMAGE_SIZES.MEDIUM} url={guide.previewImageUrl}/>
        </Col>
        <Col xs={24} sm={16} style={{ padding: '0 20px 20px' }}>
          <GuideTitle>{guide.name}</GuideTitle>
          <GuideDescription value={guide.description}/>
          {isBought ? (
            <Button>
              <Link to={`/guides/${guide.url}/explore`}>Open</Link>
            </Button>
          ) : (
            <>
              <UseVoucherButton/>
              <Button onClick={onBuy}>
                Buy for {guide.price} {guide.currency}
              </Button>
            </>
          )}
        </Col>
      </Row>
    </div>
  )
}
