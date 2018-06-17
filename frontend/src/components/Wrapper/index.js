import React, { Component } from 'react';
import Game from '../Game';
import { Route, Switch, withRouter } from 'react-router-dom';
import EditGame from '../Game/Edit';
import EditSteps from '../Game/EditSteps';
import Home from '../Home';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

import './style.css';

class Wrapper extends Component {
    render() {
        return (
            <div id="wrapper">
                <Navbar/>
                <Sidebar/>
                <div style={{gridArea:"main", padding: "15px"}}>
                    <Switch>
                        <Route path={'/'} exact={true} component={Home}/>
                        <Route path={'/games'} exact={true} component={Game}/>
                        <Route path={'/games/edit/:id'} component={EditGame}/>
                        <Route path={'/games/edit'} component={EditGame}/>
                        <Route path={'/games/steps/:id'} component={EditSteps}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(Wrapper);
