import { useQuery } from '@apollo/react-hooks'
import React  from 'react'
import gql from 'graphql-tag'
import isNil from 'lodash/isNil'
import { useParams } from 'react-router'
import { GuideViewer } from '../../organism/GuideViewer/GuideViewer'
import CheckUser from '../../organism/CheckUser/CheckUser'
import { State } from '../../../store'
import { useSelector } from 'react-redux'
import { Spinner } from '../../../common/atoms/Spinner/Spinner'

const GUIDE_QUERY = gql`
  fragment dayRestrictionFields on DayRestriction {
    state
    from
    to
  }
  fragment itemBaseFields on Item {
    id
    name
    showOnMap
    title
    description
    previewImageUrl
    type
    tags {
      id
      name
      color
      icon
    }
    restrictions {
      state
      dayRestrictions {
        mon {
          ...dayRestrictionFields
        }
        tue {
          ...dayRestrictionFields
        }
        wed {
          ...dayRestrictionFields
        }
        thu {
          ...dayRestrictionFields
        }
        fri {
          ...dayRestrictionFields
        }
        sat {
          ...dayRestrictionFields
        }
        sun {
          ...dayRestrictionFields
        }
      }
    }
  }

  query fetch($id: String, $url: String) {
    fetchGuide(id: $id, url: $url) {
      id
      name
      url
      description
      latitude
      longitude
      zoomLevel
      items(published: true) {
        ...itemBaseFields
        latitude
        longitude
        relatedItems(published: true) {
          ...itemBaseFields
        }
      }
    }
    tags {
      id
      name
    }
  }
`

type MatchParams = {
  url: string
}

export const GuideExplore = () => {
  const params = useParams<MatchParams>()
  const userData = useSelector((state: State) => state.userData)

  const { loading, error, data } = useQuery(GUIDE_QUERY, {
    skip: isNil(params.url),
    variables: {
      url: params.url
    }
  })

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <>
      <GuideViewer model={data.fetchGuide} tags={data.tags} />
      {!userData && <CheckUser />}
    </>
  )
}

