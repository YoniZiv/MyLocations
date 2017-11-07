import React from "react";
import Header from "../header/header";
import AppContainer from "../../StyledComponents/app-container";
import headerText from "../../assets/header-text";
import LocationsList from "./locations-list/locations-list";

const LocationsPage = () => (
  <section className="app-profile">
    <Header title={ headerText.Profile.title } subTitle={ headerText.Profile.subTitle } />
      <AppContainer>
        <LocationsList/>
      </AppContainer>
  </section>
);

export default LocationsPage;
