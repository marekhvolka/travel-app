import React from 'react'
import FaMap from 'react-icons/lib/fa/map'
import FaSearch from 'react-icons/lib/fa/search'
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart'
import styled from 'styled-components'
import { Button } from '../../../common/atoms/Button/Button'
import { Guides } from './Guides'
import { Steps } from './Steps'
import headerImage from './header.jpg'

const HeaderWrapper = styled.div`
  padding: 20px 20px 70px;
  margin-bottom: 80px;
  background-image: url(${headerImage});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: right;
`

const StepsHeadline = styled.h2`
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 25px;
`

const MainHeading = styled.h1`
  text-transform: uppercase;
  font-weight: bold;
  line-height: 29px;
  font-size: 30px;
`

const HeaderText = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 30px;
`

export const Home = () => (
  <div>
    <HeaderWrapper>
      <div style={{width: '50%'}}>
        <MainHeading>Explore cities with our guides</MainHeading>
        <HeaderText>
          On vacation in Prague? Find the most beautiful places based on your preferences. Explore facts about
          historic buildings, navigate with the app to find the right way and spend a romantic walk with your partner.
        </HeaderText>
        <div>
          <Button primary>Learn more</Button>
        </div>
      </div>
    </HeaderWrapper>
    <div>
      <StepsHeadline>How does it work?</StepsHeadline>
      <Steps
        steps={[
          {
            icon: <FaShoppingCart size={60}/>,
            title: 'Buy a guide',
            text: 'Pay for the guide with your credit card',
          },
          {
            icon: <FaSearch size={60}/>,
            title: 'Plan your journey',
            text: `Explore the guide content, bookmark places and events.`,
          },
          {
            icon: <FaMap size={60}/>,
            title: 'Enjoy the city',
            text: `Navigate to the places with your phone and explore details.`,
          },
        ]}
      />
    </div>
    <Guides/>
  </div>
)
