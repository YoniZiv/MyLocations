import React from 'react'
import axios from 'axios'

import {
    Button, Col, ControlLabel, FormControl, FormGroup, Grid, HelpBlock, Row, Thumbnail,
    Well
} from "react-bootstrap";
import {connect} from "react-redux";
import {deleteLocation, editLocation} from "../../Redux/Actions/categoriesActions";
import {Growl} from "primereact/components/growl/Growl";
import {msgSaveLocation, msgCance, msgDeleteLocation} from "../../Redux/Constants/growlMessages"
import {changeMapLocation} from "../../Redux/Actions/mapActions";
import styled from 'styled-components';
import {validateFields} from "../../common/validator";


class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            photoUrl: this.getPicture(),
            editMode: this.props.name ? false : true,

            locationName: this.props.name || '',
            address: this.props.address,
            lat: this.props.lat || '',
            long: this.props.long || '',

            tempLocationName: this.props.name || '',
            tempAddress: this.props.address || '',

            invalidFields: [],
            validLocationName: true,
            validAddress: true,
        }
    }


    getPicture = () => {

        const localProxyUrl = 'http://localhost:8000';

        const urlPhotoData = localProxyUrl + '/maps/api/place/nearbysearch/json?location=' + this.props.lat + ',' + this.props.long + '&radius=500&key=AIzaSyDtV9TcN_rFgXJsxTqnBGepFB8h4UcJJl0';
        axios.get(urlPhotoData).then((res) => {
            const photoRef = res.data.results[0].photos[0].photo_reference;
            const urlPhoto = localProxyUrl + '/maps/api/place/photo?maxwidth=400&maxheight=180&photoreference=' + photoRef + '&key=AIzaSyDtV9TcN_rFgXJsxTqnBGepFB8h4UcJJl0';
            console.log(urlPhoto);

            axios.get(urlPhoto).then((res) => {
                this.setState({photoUrl: res.config.url.replace(localProxyUrl, "https://maps.googleapis.com")})
            }).catch((err2) => console.log("ERRRRRRR", err2));
        }).catch((err) => console.log("ERRor", err))

    }


    saveLocation = (props) => {
        const invalidFields = validateFields({locName: this.state.tempLocationName, address: this.state.tempAddress},'location')
        if(invalidFields.length === 0)
        {
            this.props.editLocation(this.state.locationName,this.state.address, this.state.tempLocationName, this.state.tempAddress);
            this.props.showGrowl(msgSaveLocation)
            this.setState({
                locationName: this.state.tempLocationName,
                address: this.state.tempAddress,
                editMode: false,
            })
            // this.props.addNewCategory(this.state.tempText);


        } else{
            this.setState({
                invalidFields: invalidFields
            })
        }

        // const invalidFields = validateFields({locName: this.state.tempLocationName, address: this.state.tempAddress, catNames: 'mock' }, 'location');
        // if (invalidFields.length > 0) {
        //
        //     this.setState({catNameValid: false})
        // }



    }

    EditCard = () => {
        this.props.showGrowl(null)
        this.setState({
            editMode: true,
        });
    }

    deleteCategory = () => {
        this.props.deleteLocation( this.props.catName, this.state.tempLocationName);
        this.props.showGrowl(msgDeleteLocation);
    }

    ChangeText = (e, type) => {
        switch (type) {
            case 'name': {
                this.setState({tempLocationName: e.target.value})
                break;
            }
            case 'address': {
                this.setState({tempAddress: e.target.value})
                break;
            }
        }
    }

    cancelEdit = () => {
        this.props.showGrowl(msgCance);
        this.setState({
            editMode: false,
        })
    }

    setNewMarker = () => {
        this.props.showGrowl();
        this.props.changeMapLocation(this.state.lat, this.state.long);
    }

    _editLocation() {

        return (
            <section id="editLocation">
                <Col xs={4} md={4}>
                    <Thumbnail>
                        <h3>Edit Location</h3>
                        <form>
                            <FormGroup controlId="formValidationSuccess1" validationState={this.state.invalidFields.indexOf('locName') === -1 ? null : 'error' }>
                                <FormControl type="text"
                                             placeholder="Location Name"
                                             value={this.state.tempLocationName}
                                             onChange={(e) => this.ChangeText(e, 'name')}/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1" validationState={this.state.invalidFields.indexOf('address') === -1 ? null : 'error' }>
                                <FormControl type="text"
                                             placeholder="Address"
                                             value={this.state.tempAddress}
                                             onChange={(e) => this.ChangeText(e, 'address')}/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                <FormControl type="text"
                                             disabled
                                             value={this.state.lat}/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                <FormControl type="text"
                                             disabled
                                             value={this.state.long}/>
                                <HelpBlock>Help text with validation state.</HelpBlock>
                                <Button bsStyle="primary"
                                        onClick={this.saveLocation}>Apply</Button>&nbsp;
                                <Button bsStyle="danger" onClick={this.cancelEdit}>Cancel</Button>
                            </FormGroup>
                        </form>
                    </Thumbnail>
                </Col>
            </section>
        );
    }


    _finishedLocation() {
        return (
            <section id="finishedLocation">
                <Col xs={4} md={4}>
                    <Thumbnail
                        src={this.state.photoUrl || 'https://media.giphy.com/media/PphxM6dOTWuoo/giphy.gif'}>
                        <Button bsStyle="success"
                                style={{borderRadius: '50%', outline: 'none'}}
                                onClick={() => this.setNewMarker()}>
                            <i className="round fa fa-map-marker " aria-hidden="true"></i>
                        </Button>
                        <h3>{this.state.locationName} </h3>
                        <h4>{this.state.address}</h4>
                        <h5> {this.state.lat} X {this.state.long}</h5>
                        <Button bsStyle="primary" onClick={this.EditCard.bind(this)}>Edit</Button>&nbsp;
                        <Button bsStyle="danger"
                                onClick={() => this.deleteCategory()}>Delete</Button>


                    </Thumbnail>
                </Col>
            </section>
        );
    }


    render() {
        return (
            <section id="location">
                {this.state.editMode ? this._editLocation() : this._finishedLocation()}
            </section>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {editLocation, changeMapLocation, deleteLocation})(Location)

