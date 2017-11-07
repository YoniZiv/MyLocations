import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class AppNav extends Component {
    render() {
        return (
            <section className="app-nav">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/"> <i className="round fa fa-map-marker "/> My Locations</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                </Navbar>
            </section>
        );
    }
}