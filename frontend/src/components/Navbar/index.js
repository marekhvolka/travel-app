import React, { Component } from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <div style={{
                gridArea: 'navbar',
                textAlign: 'center',
                backgroundColor: '#F6F6F6',
                borderBottom: '1px solid #e7e7e7',
                minHeight: '50px'
            }}>
            </div>
        );
    }
}
