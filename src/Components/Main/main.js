import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import {PageTransition} from "react-router-page-transition";

import Profile from "../Profile/profile";
import Home from "../Home/home";
import Login from "../Auth/Login/login";


export class Main extends Component {



    styleObj = {
        flexGrow: 1,
        minHeight: "calc(100vh - 150px - 50px - 100px)",
        backgroundImage: "url('https://ak3.picdn.net/shutterstock/videos/11659394/thumb/1.jpg?i10c=img.resize(height:160)')",
        // backgroundImage: "url('https://cdn.shutterstock.com/shutterstock/videos/13377692/thumb/1.jpg?i10c=img.resize(height:160)')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
    }

    render() {
        return (
            <section id="app-main">
                <div style={ this.styleObj }>
                    <Switch>
                        <Route path="/profile" component={ Profile }/>
                        <Route path="/login" component={ Login }/>
                        <Route path="/" component={ Home }/>
                    </Switch>
                </div>
            </section>
        );
    }

}