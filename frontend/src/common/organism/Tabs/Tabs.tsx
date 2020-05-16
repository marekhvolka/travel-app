import React, { useState } from 'react'
import styled, { css } from 'styled-components'

type TabButtonProps = {
  active?: boolean
}

const TabButton = styled.div<TabButtonProps>`
  ${props => props.active && css`
    border-bottom: 2px solid ${props => props.theme.primaryColor};
  `}
  padding: 5px 20px;
  display: inline-block;
  cursor: pointer;
  color: ${props => props.theme.primaryColor};
`

const ContentWrapper = styled.div`
  padding: 20px
`

type Props = {
  children: any
  defaultActiveIndex: any
}

export const Tabs = ({ children, defaultActiveIndex }: Props) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex || 0)

  const activeTabContent = children[activeIndex] ? children[activeIndex].props.children : ''

  return (
    <div>

      <div>
        {children.map((child, index) => (
          <TabButton key={index} active={activeIndex === index} onClick={() => setActiveIndex(index)}>
            {child.props.title}
          </TabButton>
        ))}
      </div>
      <ContentWrapper>
        {activeTabContent}
      </ContentWrapper>
    </div>
  )
}
