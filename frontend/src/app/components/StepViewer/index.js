import React, { Component } from 'react';

export class StepViewer extends Component {
    render() {
        if (!this.props.step) {
            return (
                <div>Loading</div>
            );
        }
        return (
            <div>
                <h1>{this.props.step.title}</h1>
                <p>{this.props.step.description}</p>
            </div>
        )
    }
}
