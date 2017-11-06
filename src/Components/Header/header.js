import React, { PropTypes } from "react";
import { Container } from 'react-bootstrap';
import styled from 'styled-components';


const Header = ({ title, subTitle }) => (
  <section id="app-header">
    <Wrapper>
      <h1> {title} </h1>
      <h5> {subTitle} </h5>
    </Wrapper>
  </section>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
};

const Wrapper = styled.div`
  background-color: rgba(114, 0, 178, 0.83);
  width: 100%;
  height: 150px;
  border: solid transparent;
  opacity: 0.9;
  color: white;
`;

export default Header;