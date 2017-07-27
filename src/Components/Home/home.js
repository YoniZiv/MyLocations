import React from "react";
import headerText from "../../assets/header-text";
import Header from "../Header/header";
import AppContainer from "../../StyledComponents/app-container";
import HamCarousel from "../Carousel/carousel";


const Home = () => (
  <section id="app-home">
    <Header title={ headerText.Home.title} subTitle={ headerText.Home.subTitle} />
    <AppContainer>
      <div>
        <HamCarousel />
      </div>
    </AppContainer>
  </section>
);

export default Home;