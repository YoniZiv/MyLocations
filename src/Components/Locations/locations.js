import React from 'react'
import {
    Accordion, Button, Col, ControlLabel, FormControl, FormGroup, Grid, HelpBlock, Panel, PanelGroup, Row,
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
import * as _ from "lodash";
import {msgSaveLocation} from "../../Redux/Constants/growlMessages"
import {Growl} from "primereact/components/growl/Growl";
import {showGrowl} from "../../common/growlMessage";

class Locations extends React.Component {

    constructor(props) {
        super(props);
        const listOfCategories = _.map(props.cats, (cat) => {
            return ({value: cat, label: cat});
        })
        this.state = {
            options: listOfCategories,
            name: '',
            address: '',

            tempName: '',
            tempAddress: '',
            catList: Object.keys(props.places),
            invalidFields: ['key1', 'key2']

        }
    }



    logChange = (val) => {
        console.log('Selected: ', val);
        this.setState({value: val})
    }


    ChangeText = (e, type) => {
        switch (type) {
            case 'name': {
                this.setState({tempName: e.target.value, messages: []})
            }
            case 'address': {
                this.setState({tempAddress: e.target.value, messages: []})
            }
        }
    }

    saveLocation = () => {
        this.setState({
            name: this.state.tempName,
            address: this.state.tempAddress,
        })

        this.props.addNewLocation({
            cats: this.state.value,
            name: this.state.tempName,
            address: this.state.tempAddress,
            lat: this.props.map.markerLat,
            long: this.props.map.markerLng
        })
        this.showGrowl(msgSaveLocation);
    }

    showGrowl = (growlMessage) => {
        growlMessage ?
            this.setState({
                messages: [growlMessage]
            }) :
            this.setState({
                messages: []
            })
    }

    render() {
        let i = 0;
        return (
            <section id="locations">
                <Growl value={this.state.messages}></Growl>
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
                                        <FormControl type="text" placeholder="Latitude" value={this.props.map.markerLat}
                                                     disabled/>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>
                                    <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                        <FormControl type="text" placeholder="Longitude"
                                                     value={this.props.map.markerLng} disabled/>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>
                                    <Button bsStyle="primary" onClick={this.saveLocation}>Add</Button>
                                </form>
                            </Thumbnail>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <PanelGroup>

                                {_.map(this.props.places, (place, placeName) => {
                                    return (
                                        <Panel collapsible header={placeName} eventKey={++i}>
                                            {place.map((location) => {
                                                return (
                                                    <Location name={location.name}
                                                              address={location.address}
                                                              showGrowl={this.showGrowl}
                                                              key={"location_" + location.name}
                                                              catName={placeName}
                                                              long={location.long}
                                                              lat={location.lat}/>

                                                )
                                            })}
                                        </Panel>
                                    )
                                })}
                            </PanelGroup>
                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    places: _.groupBy(state.locations.locations, (cat) => cat.category),
    cats: state.categories.categories,
    map: state.map,
});


export default connect(mapStateToProps, {addNewLocation})(Locations)

