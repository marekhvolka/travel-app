import { useQuery } from '@apollo/react-hooks'
import { Col, Row } from 'antd'
import gql from 'graphql-tag'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../../../common/atoms/Button/Button'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { Text } from '../../../common/atoms/Text/Text'
import { IMAGE_SIZES } from '../../../common/common'

const QUERY = gql`
  {
    guides {
      id
      url
      name
      previewImageUrl
      description
      price
      currency
    }
    tags {
      name
    }
  }
`

const GuideWrapper = styled.div`
  border: 1px solid ${props => props.theme.border.color};
  border-radius: 2px
  margin-bottom: 20px
  box-shadow: 0 0 2px rgba(0,0,0,.2);
  padding: 10px;
  
  :hover {
    box-shadow: 0 0 8px rgba(0,0,0,.35)
  }
`

const GuideInfoWrapper = styled.div`
  text-align: center
  padding: 5px 20px
`

const GuideHeading = styled.h4`
  font-size: 20px
  font-weight: bold
  text-transform: uppercase
`

const GuideDescription = styled(Text)`
  line-height: 25px
  color: ${(props) => props.theme.color.muted}
  text-align: justify
`

export const Guides = () => {
  const { loading, error, data } = useQuery(QUERY)

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <div>
      <div>
        {data.guides.map(guide => (
          <Link key={guide.id} to={`/guides/${guide.url}`}>
            <GuideWrapper>
              <Row>
                <Col xs={24} md={8}>
                  <ImageWrapper
                    size={IMAGE_SIZES.MEDIUM}
                    url={guide.previewImageUrl}
                  />
                </Col>
                <Col xs={24} md={16}>
                  <GuideInfoWrapper>
                    <GuideHeading>{guide.name}</GuideHeading>
                    <GuideDescription value={guide.description}/>
                    <span>Price: {`${guide.price} ${guide.currency}`}</span>
                    &nbsp;
                    <Button>Detail</Button>
                  </GuideInfoWrapper>
                </Col>
              </Row>
            </GuideWrapper>
          </Link>
        ))}
      </div>
    </div>
  )
}
