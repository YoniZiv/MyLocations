import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LocationsPage from '../locations-page/locations-page';
import CategoriesPage from '../categories-page/categories-page';
import styled from 'styled-components';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';

const MainContainer = styled.div`
    flex-grow: 1;
    min-height: calc(100vh - 150px - 50px - 100px);
    background-image: url('https://ak3.picdn.net/shutterstock/videos/11659394/thumb/1.jpg?i10c=img.resize(height:160)');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
`;

export class Main extends Component {
    render() {
        return (
            <section className="app-main">
                <MainContainer>
                    <Switch>
                        <Route path="/locations" component={ LocationsPage }/>
                        <Route path="/" component={ CategoriesPage }/>
                    </Switch>
                </MainContainer>
            </section>
        );
    }
}