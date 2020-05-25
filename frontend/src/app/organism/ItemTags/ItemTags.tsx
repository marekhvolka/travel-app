import React from 'react'
import styled from 'styled-components'
// import * as FontAwesome from 'react-icons/lib/fa';

const Tag = styled.span`
  border-radius: ${props => props.theme.border.radius};
  border: 1px solid;
  font-size: 10px;
`

type Props = {
  item: any
}

export const ItemTags = ({ item }: Props) => (
  <div>
    {item.tags.map(tag => (
      // const IconComponent = tag.icon ? React.createElement(FontAwesome[tag.icon]) : null;

      <Tag
        key={tag.id}
        style={{
          borderColor: tag.color ? tag.color : '#000',
          color: tag.color ? tag.color : '#000',
        }}
      >
        {/* {IconComponent ? IconComponent : ''}*/}
        {tag.name}
      </Tag>
    ))}
  </div>
)
