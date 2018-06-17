import React, { Component } from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import * as FontAwesome from 'react-icons/lib/fa';
import * as _ from 'lodash';
import StepForm from './stepForm';
import Modal from 'react-modal';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DeviceContainer } from '../../DeviceContainer';

const customStyles = {
    content: {
        top: '20%',
        left: '20%',
        right: '20%',
        bottom: '20%',
    }
};

const grid = 8;

const getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

class EditSteps extends Component {
    state = {
        id: undefined,
        name: '',
        modalIsOpen: false,
        step: undefined,
        steps: [
            {
                id: 1,
                nextStepId: 2,
                name: 'Prvy krok',
                description: 'Toto je prvy krok. Budes musiet vyriesit velmi tazku hadanku'
            },
            {
                id: 2,
                nextStepId: 3,
                name: 'Prichadzame ku hradu',
                description: 'Daj si pozor, aby ta niekto nevidel. Ludia na hrade su obzvlast citlivy na cudzincov'
            },
            {
                id: 3,
                nextStepId: 4,
                name: 'Posledna a najtazsia uloha.',
                description: '. Musis otvorit tajne dvere a vyslobodit vaznov. Ponahlaj sa, cas neuprosne bezi'
            },
            {
                id: 4,
                nextStepId: undefined,
                name: 'Gratulujeme',
                description: 'Si na konci a uspesne!! Kup si za to cukrik'
            }
        ]
    };

    componentWillReceiveProps(newProps) {
        if (newProps !== this.props && newProps.getGame.getGame) {
            const { id, name, description } = newProps.getGame.getGame;

            this.setState({
                name,
                description,
                id
            });
        }
    }

    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.stepChanged = this.stepChanged.bind(this);
        this.addStep = this.addStep.bind(this);
        this.editFinished = this.editFinished.bind(this);
        // this.onDragEnd = this.onDragEnd.bind(this);
    }

    openModal(step) {
        this.setState({
            modalIsOpen: true,
            step: step
        });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    editFinished(step) {
        this.setState({
            modalIsOpen: false
        });
    }

    stepChanged(editedStep) {
        const steps = this.state.steps;

        for (let i = 0; i < steps.length; i++) {
            if (steps[i].id === editedStep.id) {
                steps[i] = editedStep;
            }
        }

        this.setState({
            steps
        });
    }

    addStep() {
        const step = {
            id: Math.random()
                .toString(36)
                .replace(/[^a-z]+/g, '')
                .substr(0, 5),
            name: '',
            description: '',
            changed: true
        };

        const steps = this.state.steps;

        steps.push(step);

        const lastStep = steps.find((step) => _.isNil(step.nextStepId));

        if (lastStep) {
            lastStep.nextStepId = step.id;
            lastStep.changed = true;
        }

        this.setState({ steps });
    }

    // onDragEnd(result) {
    //     // dropped outside the list
    //     if (!result.destination) {
    //         return;
    //     }
    //
    //     const items = this.reorder(
    //         this.state.steps,
    //         result.source.index,
    //         result.destination.index
    //     );
    //
    //     this.setState({
    //         items
    //     });
    // }

    // reorder(list, from, to) {
    //     if (from === to) {
    //         return list;
    //     }
    //
    //     const currentFrom = list[from];
    //     const previousFrom = from !== 0 ? list[from - 1] : undefined;
    //     const currentTo = list[to];
    //     const previousTo = to !== 0 ? list[to - 1] : undefined;
    //
    //     previousFrom && (previousFrom.nextStepId = currentFrom.nextStepId);
    //     previousTo && (previousTo.nextStepId = currentFrom.id);
    //     currentFrom.nextStepId = currentTo.id;
    //
    //
    //     return list;
    // }

    getStepsInOrder() {
        const array = [];

        let actualStep = this.state.steps.find((step) => _.isNil(step.nextStepId));

        let order = this.state.steps.length - 1;

        while (!_.isNil(actualStep)) {
            actualStep.order = order--;
            array.push(actualStep);
            actualStep = this.state.steps.find((step) => step.nextStepId === actualStep.id);
        }

        return array.reverse();
    }

    render() {
        if (this.props.getGame && this.props.getGame.loading) {
            return <div>Loading</div>;
        }

        if (this.props.getGame && this.props.getGame.error) {
            return <div>Error</div>;
        }

        const steps = this.getStepsInOrder();

        const stepsContent = steps.map((step) => {
            return (
                <TimelineEvent
                    key={step.id}
                    onClick={() => this.openModal(step)}
                    title={step.name}
                    icon={<FontAwesome.FaBeer/>}>
                    {step.description} {step.changed ? 'Zmenene' : 'Nezmenene'}
                </TimelineEvent>
            );
        });

        return (
            <div>
                <h1>Edit steps {this.state.name}</h1>
                <button onClick={this.addStep}>Add step</button>
                {/*<DragDropContext onDragEnd={this.onDragEnd}>*/}
                    {/*<Droppable droppableId="droppable">*/}
                        {/*{(provided, snapshot) => (*/}
                            {/*<div*/}
                                {/*ref={provided.innerRef}*/}
                                {/*style={getListStyle(snapshot.isDraggingOver)}*/}
                                {/*{...provided.droppableProps}*/}
                            {/*>*/}
                                {/*{steps.map((item) => (*/}
                                    {/*<Draggable*/}
                                        {/*key={item.id}*/}
                                        {/*draggableId={item.id}*/}
                                        {/*index={item.order}*/}
                                    {/*>*/}
                                        {/*{(provided, snapshot) => (*/}
                                            {/*<div>*/}
                                                {/*<div*/}
                                                    {/*ref={provided.innerRef}*/}
                                                    {/*{...provided.dragHandleProps}*/}
                                                    {/*{...provided.draggableProps}*/}
                                                    {/*style={getItemStyle(*/}
                                                        {/*provided.draggableProps.style,*/}
                                                        {/*snapshot.isDragging*/}
                                                    {/*)}*/}
                                                {/*>*/}
                                                    {/*{item.id + '. ' + item.name  + ' -> ' + item.nextStepId}*/}
                                                {/*</div>*/}
                                                {/*{item.description}*/}
                                            {/*</div>*/}
                                        {/*)}*/}
                                    {/*</Draggable>*/}
                                {/*))}*/}
                                {/*{provided.placeholder}*/}
                            {/*</div>*/}
                        {/*)}*/}
                    {/*</Droppable>*/}
                {/*</DragDropContext>*/}
                <Timeline>
                    {stepsContent}
                </Timeline>
                <Modal
                    style={customStyles}
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal">
                    <StepForm
                        step={this.state.step}
                        stepChanged={this.stepChanged}
                        editFinished={this.editFinished}/>
                </Modal>
                <DeviceContainer game={{name: this.state.name, steps: this.state.steps}}/>
            </div>
        );
    }
}

const GAME_QUERY = gql`
  query getGame($id: Int!) {
        getGame(id: $id) {
            id
            name
            description
        }
    }
  `;

export default compose(graphql(GAME_QUERY, {
    name: 'getGame',
    skip: props => _.isNil(props.match.params.id),
    options: props => ({ variables: { id: props.match.params.id } })
}))(EditSteps);

