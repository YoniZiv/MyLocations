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
            const urlPhoto = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=190&photoreference=' + photoRef + '&key=AIzaSyAqIGHdKR6_yfOzkkZKtVJk9VRMyvH45fQ';
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

    ChangeText = (event) => {
        this.setState({
            tempText: event.target.value
        })
    }

    _editCategory() {

        return (
            <section id="EditCategory">
                <Col xs={4} md={4}>
                    <Thumbnail >
                        <h3>New Category</h3>
                        <form>
                            <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                <ControlLabel>Input with success</ControlLabel>
                                <FormControl type="text" placeholder="Category Name"
                                             inputRef={input => this.catName = input}
                                             value={ this.state.tempText } onChange={ this.ChangeText }/>
                                <HelpBlock>Help text with validation state.</HelpBlock>
                                <Button bsStyle="primary"
                                        onClick={ this.saveCategory.bind(this) }>Apply</Button>&nbsp;
                                <Button bsStyle="danger">Cancel</Button>
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
                    <Thumbnail src={ this.state.photoUrl }>
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
                { this.state.editMode ? this._editCategory() : this._finishedLocation() }
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {})(Location)

