import React from 'react';
import headerText from '../../assets/header-text';
import Header from '../header/header';
import AppContainer from '../styled-components/app-container';
import { Col, Grid, Row } from 'react-bootstrap';
import CategoriesList from './categories-list/categories-list';

const CategoriesPage = () => (
    <section className="app-home">
        <Header title={ headerText.Home.title } subTitle={ headerText.Home.subTitle }/>
        <AppContainer>
            <Grid>
                <Row>
                    <Col xs={ 12 } md={ 12 }>
                        <CategoriesList/>
                    </Col>
                </Row>
            </Grid>
        </AppContainer>
    </section>
);

export default CategoriesPage;