import React, { Component } from 'react';
import styled from 'styled-components';
import { Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FooterTabStyle = styled.div`
    width: 200px;
    margin-left: calc(50vw - 100px);
    margin-top : 10px,
    `;

export class Footer extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            activeKey: 1,
        }
    }

    componentDidMount() {
        this.routerObj.context.router.history.location.pathname === '/' ? null : this.setState( { activeKey: 2 } )
    }

    switchPage = ( path ) => {
        switch ( path ) {
            case '/':
                this.setState( { activeKey: 1 } );
                break;
            case '/locations':
                this.setState( { activeKey: 2 } );
                break;
            default:
                break;
        }
        this.routerObj.context.router.history.push( path )
    };

    render() {
        const { activeKey } = this.state;

        return (
            <section className="app-footer">
                <div className="footer-wrapper">
                    <FooterTabStyle>
                        <Nav bsStyle="pills" activeKey={ activeKey }>
                            <NavItem eventKey={ 1 }
                                     onClick={ () => this.switchPage( '/' ) }>
                                <i className="fa fa-list"/>
                                <br/>
                                Categories
                            </NavItem>
                            <NavItem eventKey={ 2 }
                                     onClick={ () => this.switchPage( '/locations' ) }>
                                <i className="fa fa-map-marker"/>
                                <br/>
                                Locations
                            </NavItem>
                            <Link to="/" ref={ ( input ) => this.routerObj = input }
                                  onClick={ ( e ) => e.preventDefault() }
                                  className="hide"
                            />
                        </Nav>
                    </FooterTabStyle>
                </div>
            </section>
        );
    }
}


