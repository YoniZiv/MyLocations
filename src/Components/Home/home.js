import React from "react";
import headerText from "../../assets/header-text";
import Header from "../Header/header";
import AppContainer from "../../StyledComponents/app-container";
import HamCarousel from "../Carousel/carousel";
import LocationsMap from "../Map/map";
import {Col, Grid, Row} from "react-bootstrap";
import {Locations} from "../Locations/locations";
import Category from "../Category/category";
import Categories from "../Categories/Categories";

const Home = () => (
    <section id="app-home">
        <Header title={ headerText.Home.title} subTitle={ headerText.Home.subTitle}/>
        <AppContainer>
            <Grid>
                <Row>
                    <Col xl={12} md={12} >
                        <Categories/>
                    </Col>
                </Row>
                <Row>
                    {/*<Col style={{ paddingLeft: '0' }} xl={12} md={12} >*/}
                        {/*<LocationsMap  />*/}
                    {/*</Col>*/}
                    {/*<Col xl={6} md={6}>*/}
                        {/*<input type="text"/>*/}
                    {/*</Col>*/}
                </Row>
            </Grid>
        </AppContainer>
    </section>
);

export default Home;