import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { Container } from '../common/atoms/Container/Container'
import theme from '../theme'
import { Footer } from './organism/Footer/Footer'
import { Navbar } from './organism/Navbar/Navbar'
import { GuideDetail} from './pages/GuideDetail/Detail'
import { GuideExplore } from './pages/GuideExplore/Explore'
import { Home } from './pages/Home/Home'
import { LoginContainer } from './pages/Login/LoginContainer'
import { Register } from './pages/Register/Register'

const AppWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-repeat: repeat;
  background-attachment: fixed;
  background-position: center;
  // background-image: linear-gradient(rgba(121, 96, 76, 0.15), rgba(121, 96, 76, 0.15)), url('/img/dust_scratches.png');
`

export const App = () => (
  <ThemeProvider theme={theme}>
    <AppWrapper>
      <BrowserRouter>
        <div>
          <Navbar/>
          <div
            style={{
              marginTop: '50px',
              paddingBottom: '70px',
              maxHeight: '835px',
              overflow: 'scroll',
            }}
          >
            <Container>
              <Switch>
                <Route path={'/'} exact component={Home}/>
                <Route path={'/register'} component={Register}/>
                <Route path={'/login'} component={LoginContainer}/>

                <Route path={'/guides/:url'} exact component={GuideDetail}/>
                <Route path={'/guides/:url/explore'} component={GuideExplore}/>
              </Switch>
            </Container>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    </AppWrapper>
  </ThemeProvider>
)
