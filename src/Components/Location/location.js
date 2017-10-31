import React from 'react'
import {
    Accordion, Button, Col, ControlLabel, FormControl, FormGroup, Grid, HelpBlock, Panel, Row,
    Thumbnail
} from "react-bootstrap";
import LocationsMap from "../Map/map";
import Select from 'react-select';
import Category from "../Category/category";
import axios from 'axios'

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
import {connect} from "react-redux";

class Location extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.categories);
        this.state = {
            options: [
                {value: 'one', label: 'One'},
                {value: 'two', label: 'Two'},
                {value: 'three', label: 'Three'},
                {value: 'four', label: 'Four'},
                {value: 'five', label: 'Five'},
                {value: 'six', label: 'Six'}
            ],

        }
    }

    logChange = (val) => {
        console.log('Selected: ', val);
        this.setState({value: val})
    }

    getPicture = () => {
        let response
        const urlPhotoData = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&key=AIzaSyAqIGHdKR6_yfOzkkZKtVJk9VRMyvH45fQ';
        const res = axios.get(urlPhotoData).then((res) => {
          const photoRef = res.data.results[0].photos[0].photo_reference;
           const urlPhoto = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+ photoRef +'&key=AIzaSyAqIGHdKR6_yfOzkkZKtVJk9VRMyvH45fQ';
           axios.get(urlPhoto).then((res) => response = res).catch((err2) => console.log("ERRRRRRR",err2) );
        }).catch((err) => console.log( "ERRor", err))
        setTimeout(() => {
            console.log(response.config.url);
        },500)
    }


    render() {
        return (
            <section id="location">
                <Grid>
                    <Row>
                        <Col xs={6} md={8}>
                            <LocationsMap/>
                        </Col>
                        <Col xs={6} md={4}>
                            <Thumbnail>
                                <h3>New Location</h3>
                                <form>
                                    <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                        <FormControl type="text" placeholder="Location Name"/>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>
                                    <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                        <FormControl type="text" placeholder="Address"/>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>
                                    <FormGroup controlId="formControlsSelect">
                                        <Select
                                            name="form-field-name"
                                            value={this.state.value}
                                            options={this.state.options}
                                            multi
                                            onChange={this.logChange}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                        <FormControl type="text" placeholder="Latitude"/>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>
                                    <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                        <FormControl type="text" placeholder="Longitude"/>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>
                                </form>
                                {/*<Button bsStyle="primary">Like</Button>&nbsp;*/}
                                {/*<Button bsStyle="default">Buy</Button>*/}
                                {/*</p>*/}
                            </Thumbnail>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Accordion>
                                { this.props.categories.map((name) => {
                                    return (
                                        name &&
                                        <Panel header={ name } eventKey="1">
                                            <img src={this.state.img}/>
                                            {this.props.locations.map((location) => {
                                                return (
                                                    location.catName === name ? this.getPicture() : null
                                                );
                                            })}
                                        </Panel>
                                    );
                                })}
                            </Accordion>
                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories.CategoriesNames,
    locations: state.categories.Locations
});

export default connect(mapStateToProps, {})(Location)

