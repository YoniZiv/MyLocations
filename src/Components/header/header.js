import React, { PropTypes } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  background-color: rgba(114, 0, 178, 0.83);
  width: 100%;
  height: 150px;
  border: solid transparent;
  opacity: 0.9;
  color: white;
`;

const Header = ( { title, subTitle } ) => (
    <section className="app-header">
        <HeaderWrapper>
            <h1> { title } </h1>
            <h5> { subTitle } </h5>
        </HeaderWrapper>
    </section>
);

Header.propTypes = {
    title   : PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired
};

export default Header;