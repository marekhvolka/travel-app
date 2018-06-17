import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
    links = [
        {
            slug: '/games',
            label: 'Games'
        },
        {
            slug: '/games/edit',
            label: 'Add game'
        },
        {
            slug: '/players',
            label: 'Players'
        },
        {
            slug: '/partners',
            label: 'Partners'
        }
    ];

    render() {
        const linksData = this.links.map((link) => {
            return (
                <li
                    style={{ borderBottom: '1px solid #e7e7e7' }}
                    key={link.slug}>
                    <Link
                        style={{
                            padding: '10px 15px',
                            display: 'block'
                        }}
                        to={link.slug}>{link.label}</Link>
                </li>
            );
        });

        return (
            <div style={{
                gridArea: 'sidebar',
                backgroundColor: '#F6F6F6'
            }}>
                <ul style={{
                    listStyle: 'none',
                    paddingLeft: '0px'
                }}>
                    {linksData}
                </ul>
            </div>
        );
    }
}
