import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { DataTable } from '../table';

const Game = () => (
    <Query
        query={gql`
        {
            games {
                id
                name
            }
        }
        `}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading</p>;
            if (error) return <p>Error</p>;

            return (
                <div>
                    <h1>
                        List of all games

                        <Link to={'/games/edit'}>Add game</Link>
                    </h1>
                    <DataTable
                        fields={[
                            {
                                name: 'name',
                                label: 'Name'
                            },
                            {
                                name: 'description',
                                label: 'Description'
                            }
                        ]}
                        items={data.games}
                        actions={[
                            {
                                label: 'Edit',
                                link: '/games/edit/'
                            },
                            {
                                label: 'Steps',
                                link: '/games/steps/'
                            }
                        ]}
                    />
                </div>
            );
        }}

    </Query>
);

export default Game;
