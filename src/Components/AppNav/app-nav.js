import React, { Component } from "react";
import { Button, MenuItem, Nav, NavDropdown, NavItem, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class AppNav extends Component {

  render() {
    return (
      <section id="app-nav">
          <Navbar inverse collapseOnSelect style={ {marginBottom: 0, borderRadius: 0} }>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Kalbasa</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1}><Link to="/profile">Yoni</Link></NavItem>
                <NavItem eventKey={2} href="#">Link</NavItem>
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">Link Right</NavItem>
                <NavItem eventKey={2} href="#">Link Right</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </section>
    );

  }

}