import React, { Component } from 'react';
import * as _ from 'lodash';
import { Input } from '../../Form/input';
import { TextArea } from '../../Form/textarea';

class StepForm extends Component {
    state = {
        id: undefined,
        name: '',
        description: '',
        changed: false
    };

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value, changed: true }, () => {
            this.props.stepChanged && this.props.stepChanged(this.state);
        });
    };

    componentWillMount() {
        this.setState({
            ...(this.props.step)
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (_.isNil(this.state.id)) {
            // alert('success add');
        } else {
            // alert('success update');
        }

        this.props.editFinished(this.state);
    };

    render() {
        return (
            <div>
                <Input
                    label="Name"
                    placeholder="Step name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                />
                <TextArea
                    label="Description"
                    placeholder="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                />

                <button onClick={this.handleSubmit}>Save</button>
            </div>
        );
    }
}

export default StepForm;
