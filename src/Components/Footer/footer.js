import React, {Component} from "react";
import styled from 'styled-components';
import {Nav, NavItem} from 'react-bootstrap';
import { Link } from "react-router-dom";

const FooterTabStyle = styled.div`
       width: 200px;
    margin-left: calc(50vw - 100px);
    margin-top : 10px,
    `;

export class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeKey: 1,

        }
    }

    styleObj = {
        backgroundColor: "rgba(213, 213, 213, 0.5)",
        width: "100%",
        height: 100,
        border: "solid transparent",
        opacity: 0.9,
        color: "rgba(0, 0, 0, 0.68)",
        boxShadow: "10px 10px 55px #888888",


    };

    switchPage = (path)=>{
     // debugger;
     // this.props.history.push('/'); <<<<
        switch (path){
            case '/':
                this.setState({activeKey:1});
                break;
            case '/profile':
                this.setState({activeKey:2});
                break;
            default:
                break;
        }
      this.routerObj.context.router.history.push(path)
    };

    componentDidMount() {
        this.routerObj.context.router.history.location.pathname === '/' ? null : this.setState({activeKey: 2})
    }


    render() {
        return (
            <section id="app-footer">
                <div style={ this.styleObj }>
                    <FooterTabStyle>
                        <Nav bsStyle="pills" activeKey={this.state.activeKey}>
                            <NavItem eventKey={1} onClick={() => this.switchPage('/')}><i className="fa fa-list" /><br/> Categories</NavItem>
                            <NavItem eventKey={2} onClick={() => this.switchPage('/profile')}><i className="fa fa-map-marker" /><br/>Locations</NavItem>
                        <Link to="/" ref={(input) => this.routerObj = input} onClick={ (e) => e.preventDefault() } style={{display: 'none'}}/>
                        </Nav>
                    </FooterTabStyle>
                </div>
            </section>
        );
    }
}


