import React, { useCallback } from 'react'
import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left'
import FaHeart from 'react-icons/lib/fa/heart'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ImageWrapper } from '../../../common/atoms/ImageWrapper/ImageWrapper'
import { Text } from '../../../common/atoms/Text/Text'
import { IMAGE_SIZES } from '../../../common/common'
import { Guide, Item } from '@md/common'
import { MapHideFullItemDetailAction, MapSelectItemAction, ToggleFavouriteItemAction } from '../../../store'
import { ItemCard } from '../../molecules/ItemCard/ItemCard'

const ItemName = styled.h2`
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 10px;
  display: inline-block;
  width: 85%;
`

const ItemDescription = styled(Text)`
  text-align: justify;
  margin-top: 10px;
  font-size: 15px;
  line-height: 25px;
  color: #13111196;
`

const Subheading = styled.h4`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 20px;
`

type FavouriteButtonProps = {
  active: boolean
  onClick: () => void
}

const FavouriteButton = styled(FaHeart)`
  float: right;
  margin: 5px;
  margin-top: 12px;
  font-size: 20px;
  color: ${(props: FavouriteButtonProps) => props.active ? 'red' : 'initial'};
  
  :hover {
    transform: scale(1.2);
  }
`

const HideButton = styled(FaAngleDoubleLeft)`
  background-color: #fff;
  border: 1px solid #c3bdbd;
  border-radius: 5px;
  vertical-align: middle;
  font-size: 45px;
  position: absolute;
  right: 8px;
  top: 5px;
  cursor: pointer;
  
  :hover {
    background-color: #efefef;
  }
`

const TagWrapper = styled.span`
  display: inline-block;
  border: 1px solid;
  border-color: ${props => props.theme.color.primary};
  color: ${props => props.theme.color.primary};
  padding: 5px 10px;
  border-radius: 3px;
  margin-right: 4px;
  margin-bottom: 4px;
`

const defaultDescription = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem '

type Props = {
  isInFavourites: boolean,
  guide: Guide
  item: Item
}

export const ItemDetail = React.memo(({ guide, isInFavourites, item }: Props) => {
  const dispatch = useDispatch()

  const onHide = useCallback(() => {
    dispatch({ ...new MapHideFullItemDetailAction(guide._id) })
  }, [dispatch, guide._id])

  const onRelatedItemClicked = useCallback((itemId: string) => {
    dispatch({ ...new MapSelectItemAction(guide._id, itemId) })
  }, [dispatch, guide._id])

  const onToggleFavouriteItemClicked = useCallback(() => {
    dispatch({ ...new ToggleFavouriteItemAction(guide._id, item._id) })
  }, [dispatch, guide._id, item._id])

  return (
    <>
      <HideButton onClick={onHide}/>
      <ImageWrapper size={IMAGE_SIZES.MEDIUM} url={item.previewImageUrl}/>
      <div>
        <ItemName>{item.name}</ItemName>
        <FavouriteButton
          active={isInFavourites}
          onClick={onToggleFavouriteItemClicked}
        />
      </div>
      <ItemDescription value={item.description || defaultDescription}/>
      {/*<ItemAvailability restrictions={item.restrictions}/>*/}
      <Subheading>Tags</Subheading>
      {item.tags.map((tag) => (
        <TagWrapper>{tag.name}</TagWrapper>
      ))}
      {item.relatedItems.length > 0 && (
        <>
          <Subheading>Related places</Subheading>
          {item.relatedItems.map(relatedItem => (
            <div key={relatedItem._id} onClick={() => onRelatedItemClicked(relatedItem._id)}>
              <ItemCard item={relatedItem}/>
            </div>
          ))}
        </>
      )}
    </>
  )
})
