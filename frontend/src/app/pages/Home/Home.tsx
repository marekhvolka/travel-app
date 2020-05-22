import React from 'react'
import FaMap from 'react-icons/lib/fa/map'
import FaSearch from 'react-icons/lib/fa/search'
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart'
import styled from 'styled-components'
import { Button } from '../../../common/atoms/Button/Button'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'
import { Guides } from './Guides'
import { Steps } from './Steps'
import headerImage from './header.jpg'

const HeaderWrapper = styled.div`
  padding: 20px 40px 70px
  margin-bottom: 50px
  background-image: url(${headerImage});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: right;
`

export const Home = () => (
  <div>
    <HeaderWrapper>
      <div style={{width: '50%'}}>
        <MainHeading>Explore cities with our guides</MainHeading>
        <p style={{textAlign: 'justify', marginBottom: '20px'}}>
          On vacation in foreign city? Find the most beautiful places according to your preferences. Explore facts about
          historic buildings, navigate with the app to find the right way and spend a romantic walk with your partner.
        </p>
        <div>
          <Button primary>Learn more</Button>
        </div>
      </div>
    </HeaderWrapper>
    <div>
      <h2 style={{ textAlign: 'center' }}>How does it work?</h2>
      <Steps
        steps={[
          {
            icon: <FaShoppingCart size={60} className={'pr-3'}/>,
            title: 'Buy a guide',
            text: 'Choose from guides in our site and pay for it with your credit card',
          },
          {
            icon: <FaSearch size={60} className={'pr-3'}/>,
            title: 'Plan your journey',
            text: `Log in to the app and explore all the places. Save them to the favourites
                          list. Use your PC or mobile device.`,
          },
          {
            icon: <FaMap size={60} className={'pr-3'}/>,
            title: 'Explore the city',
            text: `Use the guide in the city, navigate to the places or read the facts and
                          photos about the places`,
          },
        ]}
      />
    </div>
    <Guides/>
  </div>
)
