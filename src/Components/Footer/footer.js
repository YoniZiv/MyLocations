import React, {Component} from "react";
import styled from 'styled-components';
import {Nav, NavItem} from 'react-bootstrap';
import { Link } from "react-router-dom";

const FooterTabStyle = styled.div`
       width: 200px;
    margin-left: calc(50vw - 100px);
    margin-top : 10px
    `

export class Footer extends Component {

    constructor(props){
        super(props)

        this.state = {
            activeKey: 1
        }
    }

    styleObj = {
        backgroundColor: "rgba(213, 213, 213, 0.5)",
        width: "100%",
        height: 100,
        border: "solid transparent",
        opacity: 0.9,
        color: "rgba(0, 0, 0, 0.68)",
        boxShadow: "10px 10px 55px #888888"

    }

    nav1Clicked = ()=>{
     // debugger;
     // this.props.history.push('/'); <<<<
      this.setState({activeKey:1});
    }


    render() {
        return (
            <section id="app-footer">
                <div style={ this.styleObj }>
                    <FooterTabStyle>
                        <Nav bsStyle="pills" activeKey={this.state.activeKey}>
                            <NavItem eventKey={1} onClick={this.nav1Clicked}><Link to="/" style={{ textDecoration: 'none'}} >Categories</Link></NavItem>
                            <NavItem eventKey={2} onClick={() => this.setState({activeKey:2})}><Link to="/profile" style={{ textDecoration: 'none'}}>Locations</Link></NavItem>
                        </Nav>
                    </FooterTabStyle>
                </div>
            </section>
        );
    }
}

