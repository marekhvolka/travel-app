import React, { Component } from 'react';
import { GameViewer } from '../../app/components/GameViewer';
import './style.css';

export class DeviceContainer extends Component {
    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="inner-wrapper">
                        <GameViewer game={this.props.game}/>
                    </div>
                </div>
            </div>
        );
    }
}
