import React from 'react'
import axios from 'axios'
import {
    Button, Col, FormControl, FormGroup, HelpBlock, Thumbnail
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteLocation, editLocation } from '../../../../Redux/actions/locations-actions';
import { msgCancel, msgDeleteLocation, msgLocExist, msgSaveLocation } from '../../../../Redux/constants/growlMessages'
import { changeMapLocation } from '../../../../Redux/actions/map-actions';
import { validateFields } from '../../../../common/validator';
import { find } from 'lodash';


class Location extends React.Component {
    constructor( props ) {
        super( props );
        const { name, address, lat, long } = this.props;

        this.state = {
            photoUrl: this.getPicture(),
            editMode: !name,

            locationName: name || '',
            address     : address,
            lat         : lat || '',
            long        : long || '',

            tempLocationName: name || '',
            tempAddress     : address || '',

            invalidFields    : [],
            validLocationName: true,
            validAddress     : true,
        }
    }


    getPicture = () => {
        const { lat, long } = this.props;
        const API_KEY = 'AIzaSyCtsIdONkAnPserttlSF6O64EiYwq7qE3A';
        const localProxyUrl = 'http://localhost:8000';
        const urlPhotoData = localProxyUrl + '/maps/api/place/nearbysearch/json?location=' + lat + ',' + long + '&radius=500&key=' + API_KEY;

        axios.get( urlPhotoData ).then( ( res ) => {
            const photoRef = res.data.results[ 0 ].photos[ 0 ].photo_reference;
            const urlPhoto = localProxyUrl + '/maps/api/place/photo?maxwidth=400&maxheight=180&photoreference=' + photoRef + '&key=' + API_KEY;

            axios.get( urlPhoto ).then( ( res ) => {
                this.setState( { photoUrl: res.config.url.replace( localProxyUrl, 'https://maps.googleapis.com' ) } )
            } ).catch( ( err2 ) => console.log( 'Error on photo fetch', err2 ) );
        } ).catch( ( err ) => console.log( 'Error on photo URL fetch', err ) )

    };


    saveLocation = () => {
        const { tempLocationName, tempAddress, locationName, address } = this.state;
        const { showGrowl, locations, editLocation } = this.props;

        const invalidFields = validateFields( {
                                                  locName: tempLocationName,
                                                  address: tempAddress
                                              } );
        if ( invalidFields.length > 0 ) {
            this.setState( {
                               invalidFields: invalidFields
                           } )
        } else if ( find( locations, ( loc ) => loc.name === tempLocationName ) ) {
            showGrowl( msgLocExist )
        } else {
            editLocation( locationName, address, tempLocationName, tempAddress );
            showGrowl( msgSaveLocation );
            this.setState( {
                               locationName: tempLocationName,
                               address     : tempAddress,
                               editMode    : false,
                           } )
        }
    };

    editCard = () => {
        this.setState( {
                           editMode: true,
                       } );
    };

    deleteCategory = () => {
        const { deleteLocation, showGrowl, catName } = this.props;
        const { tempLocationName } = this.state;

        deleteLocation( catName, tempLocationName );
        showGrowl( msgDeleteLocation );
    };

    changeText = ( e, type ) => {
        switch ( type ) {
            case 'name': {
                this.setState( { tempLocationName: e.target.value } );
                break;
            }
            case 'address': {
                this.setState( { tempAddress: e.target.value } );
                break;
            }
            default: {
                break;
            }
        }
    };

    cancelEdit = () => {
        const { showGrowl } = this.props;

        showGrowl( msgCancel );
        this.setState( {
                           editMode: false,
                       } )
    };

    goToLocation = () => {
        const { showGrowl, changeMapLocation } = this.props;
        const { lat, long } = this.state;

        showGrowl();
        changeMapLocation( lat, long );

        navigator.vibrate = navigator.vibrate || navigator.webktiVibrate || navigator.mozVibrate || navigator.msVibrate;
        if ( navigator.vibrate ) {
            navigator.vibrate( 1000 );
        }
    };

    EditLocation() {
        const { invalidFields, tempLocationName, tempAddress, lat, long } = this.state;

        return (
            <section className="editLocation">
                <Col xs={ 4 } md={ 4 }>
                    <Thumbnail>
                        <h3>Edit Location</h3>
                        <form>
                            <FormGroup controlId="formValidationSuccess1"
                                       validationState={ invalidFields.indexOf( 'locName' ) === -1 ? null : 'error' }>
                                <FormControl type="text"
                                             placeholder="Location Name"
                                             value={ tempLocationName }
                                             onChange={ ( e ) => this.changeText( e, 'name' ) }/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1"
                                       validationState={ invalidFields.indexOf( 'address' ) === -1 ? null : 'error' }>
                                <FormControl type="text"
                                             placeholder="Address"
                                             value={ tempAddress }
                                             onChange={ ( e ) => this.changeText( e, 'address' ) }/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1" validationState={ null }>
                                <FormControl type="text"
                                             disabled
                                             value={ lat }/>
                            </FormGroup>
                            <FormGroup controlId="formValidationSuccess1" validationState={ null }>
                                <FormControl type="text"
                                             disabled
                                             value={ long }/>
                                <HelpBlock>Help text with validation state.</HelpBlock>
                                <Button bsStyle="primary"
                                        onClick={ this.saveLocation }>Apply</Button>&nbsp;
                                <Button bsStyle="danger"
                                        onClick={ this.cancelEdit }>Cancel</Button>
                            </FormGroup>
                        </form>
                    </Thumbnail>
                </Col>
            </section>
        );
    }



    FinishedLocation() {
        const { photoUrl, locationName, address, lat, long } = this.state;

        return (
            <section className="finishedLocation">
                <Col xs={ 4 } md={ 4 }>
                    <Thumbnail
                        src={ photoUrl || 'https://media.giphy.com/media/PphxM6dOTWuoo/giphy.gif' }>
                        <Button bsStyle="success"
                                className="round-button"
                                onClick={ this.goToLocation }
                        >
                            <i className="round fa fa-map-marker "/>
                        </Button>
                        <h3>{ locationName } </h3>
                        <h4>{ address }</h4>
                        <h5> { lat } X { long }</h5>
                        <Button bsStyle="primary"
                                onClick={ this.editCard.bind( this ) }>Edit</Button>&nbsp;
                        <Button bsStyle="danger"
                                onClick={ () => this.deleteCategory() }>Delete</Button>
                    </Thumbnail>
                </Col>
            </section>
        );
    }

    render() {
        const { editMode } = this.state;

        return (
            <section className="location">
                { editMode ? this.EditLocation() : this.FinishedLocation() }
            </section>
        )
    }
}

const mapStateToProps = ( state ) => ({
    locations: state.locations.locations
});

export default connect( mapStateToProps, { editLocation, changeMapLocation, deleteLocation } )( Location )

