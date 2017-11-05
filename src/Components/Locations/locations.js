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
import {InputSwitch} from "primereact/components/inputswitch/InputSwitch";
import {validateFields} from "../../common/validator";

class Locations extends React.Component {

    constructor(props) {
        super(props);
        const listOfCategories = _.map(props.cats, (cat) => {
            return ({value: cat, label: cat});
        })
        this.state = {
            options: listOfCategories,

            tempName: '',
            tempAddress: '',
            catList: Object.keys(props.places),
            invalidFields: ['key1', 'key2'],
            messages: [],

            checked1:true,

            invalidFields: [],
            validLocationName: true,
            validAddress: true,

        }
    }


    logChange = (val) => {
        console.log('Selected: ', val);
        this.setState({value: val})
    }


    ChangeText = (e, type) => {
        switch (type) {
            case 'name': {
                this.setState({tempName: e.target.value,messages: []})
                break;
            }
            case 'address': {
                this.setState({tempAddress: e.target.value,messages: []})
                break;
            }
        }
    }



    saveLocation = () => {
        const invalidFields = validateFields({locName: this.state.tempName, address: this.tempAddress,selections: this.state.value },'location')
        if(invalidFields.length === 0) {
            this.props.addNewLocation({
                cats: this.state.value,
                name: this.state.tempName,
                address: this.state.tempAddress,
                lat: this.props.map.markerLat,
                long: this.props.map.markerLng
            })

            this.setState({
                tempName: '',
                tempAddress: ''
            })
            this.showGrowl(msgSaveLocation);
        } else {
            this.setState({
                invalidFields: invalidFields
            })
        }
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

    onChangeBasic() {
        this.setState({checked1: !this.state.checked1});
    }
    componentWillUpdate() {
      this.state.messages.length !== 0 ? this.setState({messages: []}) : null
    }

    render() {
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
                                    <FormGroup controlId="formValidationSuccess1" validationState={this.state.invalidFields.indexOf('locName') === -1 ? null : 'error'}>
                                        <FormControl type="text" placeholder="Location Name" value={this.state.tempText}
                                                     onChange={(e) => this.ChangeText(e, 'name')}/>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>
                                    <FormGroup controlId="formValidationSuccess1" validationState={this.state.invalidFields.indexOf('address') === -1 ? null : 'error'}>
                                        <FormControl type="text" placeholder="Address" value={this.state.tempText}
                                                     onChange={(e) => this.ChangeText(e, 'address')}/>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>
                                    <FormGroup controlId="formControlsSelect" validationState={this.state.invalidFields.indexOf('selections') === -1 ? null : 'error'}>
                                        <Select
                                            name="form-field-name"
                                            value={this.state.value}
                                            options={this.state.options}
                                            multi
                                            onChange={this.logChange}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                        <FormControl type="text" placeholder="Latitude"
                                                     value={this.props.map.markerLat}
                                                     onChange={(e) => this.ChangeText(e, '')}
                                                     disabled/>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>
                                    <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                        <FormControl type="text"
                                                     placeholder="Longitude"
                                                     onChange={(e) => this.ChangeText(e, '')}
                                                     value={this.props.map.markerLng}
                                                     disabled/>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>

                                    <InputSwitch checked={this.state.checked1} onChange={() => this.onChangeBasic() } onLabel="Grouped" offLabel="Ungrouped"/>
                                    <br/>
                                    <Button bsStyle="primary" onClick={this.saveLocation}>Add</Button>
                                </form>
                            </Thumbnail>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            { this.state.checked1 ? this.GroupedLocations() : this.UngroupedLocations() }

                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }

    GroupedLocations() {
        let i = 0;
        return (
            <PanelGroup>
                {_.map(this.props.places, (place, placeName) => {
                    const sortedLocations = _.sortBy(place, (loc) => loc.name.toUpperCase())
                    return (
                        <Grid>
                            <Row>
                                <Panel collapsible header={placeName} eventKey={++i}>
                                    {sortedLocations.map((location) => {
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
                            </Row>
                        </Grid>
                    )
                })}
            </PanelGroup>
        )
    }

    UngroupedLocations() {
        const sortedList = _.sortBy(this.props.placesGrouped, (loc) => loc.name.toUpperCase())
        return (
            <Grid>
                <Row>
                    {
                        sortedList.map((loc) => (
                            <Location name={loc.name}
                                      address={loc.address}
                                      showGrowl={this.showGrowl}
                                      key={"location_" + loc.name}
                                      catName={loc.category}
                                      long={loc.long}
                                      lat={loc.lat}/>
                            )
                        )
                    }
                </Row>
            </Grid>
        )
    }

}

const mapStateToProps = (state) => ({
    places: _.groupBy(_.sortBy(state.locations.locations,(loc)=>loc.category),(loc)=>loc.category),
    placesGrouped: state.locations.locations,
    cats: state.categories.categories,
    map: state.map,
});

export default connect(mapStateToProps, {addNewLocation})(Locations)

