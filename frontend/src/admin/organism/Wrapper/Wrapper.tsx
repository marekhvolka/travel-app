import React from 'react'
import styled from 'styled-components'
import { Switch, withRouter } from 'react-router-dom'
import { Container } from '../../../common/atoms/Container/Container'
import { AllItems } from '../../pages/ItemAll/AllItems'
import ItemForm from '../../pages/ItemEdit/Edit'
import { AllCities } from '../../pages/CityAll/AllCities'
import CityForm from '../../pages/CityEdit/Edit'
import { AllGuides } from '../../pages/GuideAll/AllGuides'
import GuideForm from '../../pages/GuideEdit/Edit'
import { AllTags } from '../../pages/TagAll/AllTags'
import TagForm from '../../pages/TagEdit/Edit'
import { AllUsers } from '../../pages/User/AllUsers'
import { UserProgress } from '../../pages/User/Progress/index'
import { AllVouchers } from '../../pages/VoucherAll/AllVouchers'
import VoucherForm from '../../pages/VoucherEdit/Edit'
import { Home } from '../../pages/Home/Home'
import { GalleryContainer } from '../Gallery/GalleryContainer'
import { ProtectedRoute } from '../../../common/atoms/ProtectedRoute/ProtectedRoute'
import { Navbar } from '../Navbar/Navbar'
import { Sidebar } from '../Sidebar/Sidebar'

const WrapperContainer = styled.div`
  display: grid;
  grid-template-columns: 0fr 11fr;
  grid-template-rows: 1fr auto 1fr;
  grid-template-areas:
    'navbar navbar'
    'sidebar main'
    'footer footer';
`

const Main = styled.div`
  grid-area: 'main';
  padding: '15px';
`

const Wrapper = () => (
  <WrapperContainer>
    <Navbar />
    <Sidebar />
    <Main>
      <Container>
        <Switch>
          <ProtectedRoute path={'/'} exact component={Home} />

          <ProtectedRoute path={'/items'} exact component={AllItems} />
          <ProtectedRoute path={'/items/edit/:id'} component={ItemForm} />
          <ProtectedRoute path={'/items/edit'} component={ItemForm} />

          <ProtectedRoute path={'/cities'} exact component={AllCities} />
          <ProtectedRoute path={'/cities/edit/:id'} component={CityForm} />
          <ProtectedRoute path={'/cities/edit'} component={CityForm} />

          <ProtectedRoute path={'/guides'} exact component={AllGuides} />
          <ProtectedRoute path={'/guides/edit/:id'} component={GuideForm} />
          <ProtectedRoute path={'/guides/edit'} component={GuideForm} />

          <ProtectedRoute path={'/tags'} exact component={AllTags} />
          <ProtectedRoute path={'/tags/edit/:id'} component={TagForm} />
          <ProtectedRoute path={'/tags/edit'} component={TagForm} />

          <ProtectedRoute path={'/vouchers'} exact component={AllVouchers} />
          <ProtectedRoute path={'/vouchers/edit/:id'} component={VoucherForm} />
          <ProtectedRoute path={'/vouchers/edit'} exact component={VoucherForm} />

          <ProtectedRoute path={'/users'} exact component={AllUsers} />
          <ProtectedRoute path={'/users/progress/:id'} component={UserProgress} />

          <ProtectedRoute path={'/gallery'} component={GalleryContainer} />
        </Switch>
      </Container>
    </Main>
  </WrapperContainer>
)

export default withRouter(Wrapper)
