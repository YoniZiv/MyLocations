import React from 'react'
import axios from 'axios'

import {
    Button, Col, ControlLabel, FormControl, FormGroup, Grid, HelpBlock, Row, Thumbnail,
    Well
} from "react-bootstrap";
import {connect} from "react-redux";

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
            tempAddress: this.props.address || ''
        }
    }


    getPicture = () => {
        const urlPhotoData = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.props.lat + ',' + this.props.long + '&radius=500&key=AIzaSyAqIGHdKR6_yfOzkkZKtVJk9VRMyvH45fQ';
        axios.get(urlPhotoData).then((res) => {
            const photoRef = res.data.results[0].photos[0].photo_reference;
            const urlPhoto = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=180&photoreference=' + photoRef + '&key=AIzaSyAqIGHdKR6_yfOzkkZKtVJk9VRMyvH45fQ';
            console.log(urlPhoto)
            axios.get(urlPhoto).then((res) => this.setState({photoUrl: res.config.url})).catch((err2) => console.log("ERRRRRRR", err2));
        }).catch((err) => console.log("ERRor", err))

    }


    saveCategory = (props) => {
        this.setState({
            categoryName: this.state.tempText,
            editMode: false
        })
        // this.props.addNewCategory(this.state.tempText);
        this.props.editCategory(this.state.categoryName, this.state.tempText);

    }

    EditCard = () => {
        this.setState({
            editMode: true
        });
    }

    DeleteCategory = (categoryName) => {
        this.props.deleteFunc(categoryName);
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
        this.setState({editMode: false})
    }
    _editLocation() {

        return (
            <section id="editLocation">
                <Col xs={4} md={4}>
                    <Thumbnail >
                        <h3>Edit Location</h3>
                        <form>
                            <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                <FormControl type="text"
                                             placeholder="Location Name"
                                             value={ this.state.tempLocationName }
                                             onChange={(e) => this.ChangeText(e, 'name')}/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                <FormControl type="text"
                                             placeholder="Address"
                                             value={ this.state.tempAddress }
                                             onChange={(e) => this.ChangeText(e, 'address')}/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                <FormControl type="text"
                                             disabled
                                             value={ this.state.lat }/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                <FormControl type="text"
                                             disabled
                                             value={ this.state.long }/>
                                <HelpBlock>Help text with validation state.</HelpBlock>
                                <Button bsStyle="primary"
                                        onClick={ this.saveCategory.bind(this) }>Apply</Button>&nbsp;
                                <Button bsStyle="danger" onClick={ this.cancelEdit }>Cancel</Button>
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
                        src={ this.state.photoUrl || 'https://tse3.mm.bing.net/th?id=OIP.90fnjLCc27dgkfXc4sEDZAEsEs&w=190&h=190&c=8&qlt=90&o=4&pid=1.7'}>
                        <h3>{ this.state.locationName }</h3>
                        <h4>{ this.state.address }</h4>
                        <h5> {this.state.lat} X {this.state.long}</h5>
                        <Button bsStyle="primary" onClick={ this.EditCard.bind(this) }>Edit</Button>&nbsp;
                        <Button bsStyle="danger"
                                onClick={() => this.DeleteCategory(this.state.categoryName)}>Delete</Button>
                    </Thumbnail>
                </Col>
            </section>
        );
    }


    render() {
        return (
            <section id="location">
                { this.state.editMode ? this._editLocation() : this._finishedLocation() }
            </section>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Location)

