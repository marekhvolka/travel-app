import React, { useState } from 'react'
import styled from 'styled-components'

type TabButtonProps = {
  active?: boolean
}

const TabButton = styled.div<TabButtonProps>`
  border: 1px solid ${props => props.theme.border.color};
  border-radius: ${props => props.theme.border.radius};
  padding: 10px 20px;
  display: inline-block;
  cursor: pointer;
  background: ${props => (props.active ? props.theme.primaryColor : props.theme.secondaryColor)};
  color: ${props => (props.active ? props.theme.secondaryColor : props.theme.primaryColor)};
`

type Props = {
  children: any
  defaultActiveIndex: any
}

export const Tabs = ({ children, defaultActiveIndex }: Props) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex || 0)

  const activeTabContent = children[activeIndex] ? children[activeIndex].props.children : ''

  return (
    <>
      {children.map((child, index) => (
        <TabButton key={index} active={activeIndex === index} onClick={() => setActiveIndex(index)}>
          {child.props.title}
        </TabButton>
      ))}
      {activeTabContent}
    </>
  )
}
