import React from 'react'
import FaMap from 'react-icons/lib/fa/map'
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart'
import FaSearch from 'react-icons/lib/fa/search'
import { Button } from '../../../common/atoms/Button/Button'
import { Box } from '../../../common/atoms/Box/Box'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'
import { GuidesContainer } from './GuidesContainer'
import { Steps } from './Steps'

export const Home = () => (
  <div>
    <Box>
      <MainHeading>Explore cities with our guides</MainHeading>
      <p>
        On vacation in foreign city? Find the most beautiful places according to your preferences. Explore facts about
        historic buildings, navigate with the app to find the right way and spend a romantic walk with your partner.
      </p>
      <p>
        <Button primary>Learn more</Button>
      </p>
    </Box>
    <h2 className={'text-center'}>How does it work?</h2>
    <Steps
      steps={[
        {
          icon: <FaShoppingCart size={60} className={'pr-3'} />,
          title: 'Buy a guide',
          text: 'Choose from guides in our site and pay for it with your credit card',
        },
        {
          icon: <FaSearch size={60} className={'pr-3'} />,
          title: 'Find out the places you want to go',
          text: `Log in to the app and explore all the places. Save them to the favourites
                        list. Use your PC or mobile device.`,
        },
        {
          icon: <FaMap size={60} className={'pr-3'} />,
          title: 'Explore the city',
          text: `Use the guide in the city, navigate to the places or read the facts and
                        photos about the places`,
        },
      ]}
    />
    <GuidesContainer />
  </div>
)
