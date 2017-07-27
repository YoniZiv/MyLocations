import React from 'react'
import AppContainer from "../../../StyledComponents/app-container";
import Header from "../../Header/header";
import headerTexts from "../../../assets/header-text";
import { Button, Grid, Row, Col, Thumbnail, FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import styled from 'styled-components';
import FBManager from '../../../firebase/firebase';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

const Wrapper = styled.div`
    margin: 20px 0px 0px 0px;
    box-shadow: 3px 3px 11px #666666;
`;

const ButtonsInstance = () => (
  <div>
    <Button bsStyle="primary" bsSize="medium" block onClick={ FBManager.login }>Login</Button>
    <Button bsSize="medium" block onClick={FBManager.isAuthenticated}>Register</Button>
  </div>
);

const Login = () => (
  <section id="app-login">
    <Header title={ headerTexts.Login.title } subTitle={ headerTexts.Login.subTitle } />
    <AppContainer>
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <Wrapper>
              <Thumbnail >
                <form>
                  <FieldGroup
                    id="formControlsEmail"
                    type="email"
                    label="Email address"
                    placeholder="Enter email"
                  />
                  <FieldGroup
                    id="formControlsPassword"
                    label="Password"
                    type="password"
                  />
                 <ButtonsInstance />
                </form>
              </Thumbnail>
            </Wrapper>
          </Col>
        </Row>
      </Grid>
    </AppContainer>
  </section>
)

export default Login;