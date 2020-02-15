import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import theme from '../theme'
import RegisterContainer from './pages/Register/RegisterContainer'
import LoginContainer from './pages/Login/LoginContainer'
import GuideDetailContainer from './pages/GuideDetail/DetailContainer'
import { Home } from './pages/Home'
import GuideExplore from './pages/GuideExplore/Explore'
import { Navbar } from './organism/Navbar/Navbar'
import { Footer } from './organism/Footer/Footer'
import './App.css'

const AppWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-repeat: repeat;
  background-attachment: fixed;
  background-position: center;
  // background-image: linear-gradient(rgba(121, 96, 76, 0.15), rgba(121, 96, 76, 0.15)), url('/img/dust_scratches.png');
`

const App = () => (
  <ThemeProvider theme={theme}>
    <AppWrapper>
      <BrowserRouter>
        <div>
          <Navbar />
          <div
            style={{
              paddingBottom: '70px',
              maxHeight: '835px',
              overflow: 'scroll',
            }}
          >
            <div
              className={'wrapper container'}
              style={{
              }}
            >
              <Switch>
                <Route path={'/'} exact component={Home} />
                <Route path={'/register'} component={RegisterContainer} />
                <Route path={'/login'} component={LoginContainer} />

                <Route
                  path={'/guides/:url'}
                  exact
                  component={GuideDetailContainer}
                />
                <Route path={'/guides/:url/explore'} component={GuideExplore} />
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AppWrapper>
  </ThemeProvider>
)

export default App
