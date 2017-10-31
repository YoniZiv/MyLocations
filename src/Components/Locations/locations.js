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
import Location from "../Location/location";
import {addNewLocation} from "../../Redux/Actions/categoriesActions";

class Locations extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.categories);
        const listOfCategories = props.locations.map((loc) => ({value: loc.catName, label: loc.catName }) )
        this.state = {
            options: listOfCategories,

            name: '',
            address: '',

            tempName: '',
            tempAddress: ''

        }
        this.setState({
            options: listOfCategories
        })
        console.log(this.state.options)
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
            const urlPhoto = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photoRef + '&key=AIzaSyAqIGHdKR6_yfOzkkZKtVJk9VRMyvH45fQ';
            axios.get(urlPhoto).then((res) => response = res).catch((err2) => console.log("ERRRRRRR", err2));
        }).catch((err) => console.log("ERRor", err))
        setTimeout(() => {
            console.log(response.config.url);
        }, 1000)
    }

    ChangeText = (e, type) => {
        switch (type) {
            case 'name': {
                this.setState({tempName: e.target.value})
            }
            case 'address': {
                this.setState({tempAddress: e.target.value})
            }
        }
    }

    saveLocation = () => {
        this.setState({
            name: this.state.tempName,
            address: this.state.tempAddress
        })
        console.log('baba', this.state.tempName)
        this.props.addNewLocation({
            cats: this.state.options,
            name: this.state.tempName,
            address: this.state.tempAddress,
            lat: this.state.lat,
            long: this.state.long
        })
    }

    render() {
        return (
            <section id="locations">
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
                                        <FormControl type="text" placeholder="Location Name" value={this.state.tempText}
                                                     onChange={(e) => this.ChangeText(e, 'name')}/>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>
                                    <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                        <FormControl type="text" placeholder="Address" value={this.state.tempText}
                                                     onChange={(e) => this.ChangeText(e, 'address')}/>
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
                                        <FormControl type="text" placeholder="Latitude" value={this.state.tempText}/>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>
                                    <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                        <FormControl type="text" placeholder="Longitude" value={this.state.tempText}/>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>
                                    <Button bsStyle="primary" onClick={this.saveLocation}>Add</Button>
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

                                {this.props.locations.map((category) => {
                                    return (
                                        <Panel header={category.catName} eventkey="1">
                                            {category.locations.map((location) => {
                                                return (
                                                    <Location name={location.name}
                                                              address={location.address}
                                                              long={location.long}
                                                              lat={location.lat}/>
                                                )
                                            })}
                                        </Panel>
                                    )
                                })}

                                {/*{ this.props.categories.map((name) => {*/}
                                {/*return (*/}
                                {/*name &&*/}
                                {/*<Panel header={ name } eventKey="1">*/}
                                {/*{this.props.locations.map((category) => {*/}
                                {/*category.catName === name ?*/}
                                {/*category.locations.map((location) => {*/}
                                {/*console.log(location)*/}
                                {/*return (*/}
                                {/*<Location name={location.name}*/}
                                {/*address={ location.address }*/}
                                {/*long={ location.long }*/}
                                {/*lat={ location.lat } />*/}
                                {/*);*/}
                                {/*}) : null})}*/}

                                {/*/!*<img src={this.state.img}/>*!/*/}
                                {/*/!*{this.props.locations.map((location) => {*!/*/}
                                {/*/!*return (*!/*/}
                                {/*/!*location.catName === name ? this.getPicture() : null*!/*/}
                                {/*/!*);*!/*/}
                                {/*/!*})}*!/*/}
                                {/*</Panel>*/}
                                {/*);*/}
                                {/*})}*/}
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

export default connect(mapStateToProps, {addNewLocation})(Locations)

