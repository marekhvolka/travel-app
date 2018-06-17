import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class DataTable extends Component {
    render() {
        const headers = this.props.fields && this.props.fields.map((field) => {
            return <th>{field.label}</th>
        });

        const rows = this.props.items && this.props.items.map((item) => {
            const rowContent = this.props.fields && this.props.fields.map((field) => {
                return <td>{item[field.name]}</td>
            });

            const actions = this.props.actions && this.props.actions.map((action) => {
                return (
                    <Link to={action.link + item.id}>{action.label}</Link>
                )
            });

            return (
                <tr key={item.id}>{rowContent}<td>{actions}</td></tr>
            );
        });

        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        {headers}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        )
    }
}
