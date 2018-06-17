import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Wrapper from './components/Wrapper';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Wrapper/>
            </BrowserRouter>
        );
    }
}

export default App;
