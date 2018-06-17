import React, { Component } from 'react';
import { StepViewer } from '../StepViewer';

export class GameViewer extends Component {
    state = {
        actualStep: undefined,
        game: undefined
    };

    constructor() {
        super();

        this.getBack = this.getBack.bind(this);
        this.getForward = this.getForward.bind(this);
    }

    componentWillMount() {
        this.setState({
            game: this.props.game,
            actualStep: this.props.game.steps[0]
        });
    }

    getBack() {
        const previousStep = this.state.game.steps.find((step) => step.nextStepId === this.state.actualStep.id);

        if (previousStep) {
            this.setState({
                actualStep: previousStep
            });
        }
    }

    getForward() {
        const nextStep = this.state.game.steps.find((step) => step.id === this.state.actualStep.nextStepId);

        if (nextStep) {
            this.setState({
                actualStep: nextStep
            });
        }
    }

    render() {
        return (
            <div>
                <h1>This is game viewer</h1>
                <a onClick={this.getBack}>Back</a>
                <a onClick={this.getForward}>Forward</a>
                <StepViewer step={this.state.actualStep}/>
            </div>
        )
    }
}
