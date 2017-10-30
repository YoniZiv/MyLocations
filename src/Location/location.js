import React from 'react'
import {Button, Col, ControlLabel, FormControl, FormGroup, Grid, HelpBlock, Row, Thumbnail} from "react-bootstrap";

export class Location extends React.Component{

    render(){
        return (
            <section id="location">
                <Grid>
                    <Row>
                        <Col xs={6} md={4}>
                            <Thumbnail >
                                <h3>New Location</h3>
                                <form>
                                    <FormGroup controlId="formValidationSuccess1" validationState="success">
                                        <ControlLabel>Input with success</ControlLabel>
                                        <FormControl type="text" placeholder="Location Name" />
                                        <HelpBlock>Help text with validation state.</HelpBlock>
                                    </FormGroup>
                                </form>
                                    {/*<Button bsStyle="primary">Like</Button>&nbsp;*/}
                                    {/*<Button bsStyle="default">Buy</Button>*/}
                                {/*</p>*/}
                            </Thumbnail>
                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }
}

