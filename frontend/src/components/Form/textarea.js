import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

export class TextArea extends Component {
    render() {
        return (
            <FormGroup
                controlId="formBasicText"
                validationState={this.props.getValidationState && this.props.getValidationState()}
            >
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl
                    componentClass="textarea"
                    name={this.props.name}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                />
                <FormControl.Feedback/>
                <HelpBlock>{this.props.helperText}</HelpBlock>
            </FormGroup>
        );
    }
}
