import React, { Component } from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

import { Input } from '../../Form/input';
import { TextArea } from '../../Form/textarea';
import * as _ from 'lodash';

class EditGame extends Component {
    state = {
        id: undefined,
        name: '',
        description: ''
    };

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (_.isNil(this.state.id)) {
            this.props.addGame({
                variables: {
                    ...this.state
                }
            })
                .then(() => {
                    // this.props.router.replace('/games');
                    alert('success add');
                });
        } else {
            this.props.updateGame({
                variables: {
                    ...this.state
                }
            })
                .then(() => {
                    // this.props.router.replace('/games');
                    alert('success update');
                });
        }
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

    render() {
        if (this.props.getGame && this.props.getGame.loading) {
            return <div>Loading</div>;
        }

        if (this.props.getGame && this.props.getGame.error) {
            return <div>Error</div>;
        }

        return (
            <div>
                <h1>{this.props.match.params.id ? 'Edit game' : 'Add game'}</h1>
                <Input
                    placeholder="Game name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                />
                <TextArea
                    placeholder="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                />

                <button onClick={this.handleSubmit}>Submit</button>

                <h3>State</h3>
                <pre>{JSON.stringify(this.state)}</pre>
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

const updateGame = gql`
  mutation updateGame($id: Int!, $name: String!, $description: String!) {
    updateGame(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

const addGame = gql`
  mutation addGame($name: String!, $description: String!) {
    addGame(name: $name, description: $description) {
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
    }),
    graphql(updateGame, {
        name: 'updateGame'
    }),
    graphql(addGame, {
        name: 'addGame'
    }))(EditGame);

/*

<Query
                query={gql`
        query getGame($id: Int!) {
            getGame(id: $id) {
                id
                name
                description
            }
        }
        `}
                variables={{ id: 1 }}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading</p>;
                    if (error) return <p>Error</p>;

                    this.setState({
                        ...data.getGame
                    });

                    return (

                    );
                }}

            </Query>
 */
