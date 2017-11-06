import React from "react";
import Header from "../Header/header";
import AppContainer from "../../StyledComponents/app-container";
import headerText from "../../assets/header-text";
import Locations from "../Locations/locations";

const Profile = () => (
  <section id="app-profile">
    <Header title={ headerText.Profile.title } subTitle={ headerText.Profile.subTitle } />
      <AppContainer>
        {/*<Slavs/>*/}
        <Locations/>
      </AppContainer>
  </section>
);

export default Profile;
