import React from 'react'
import {
    Button, Col, FormControl, FormGroup, Grid, Panel, PanelGroup, Row,
    Thumbnail
} from 'react-bootstrap';
import LocationsMap from '../../map/map';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import Location from './location/location';
import { addNewLocation } from '../../../Redux/actions/locations-actions';
import { sortBy, groupBy, map, find } from 'lodash';
import { msgLocExist, msgSaveLocation } from '../../../Redux/constants/growlMessages'
import { Growl } from 'primereact/components/growl/Growl';
import { InputSwitch } from 'primereact/components/inputswitch/InputSwitch';
import { validateFields } from '../../../common/validator';

class LocationsList extends React.Component {

    constructor( props ) {
        super( props );

        const listOfCategories = map( props.cats, ( cat ) => {
            return ({ value: cat, label: cat });
        } );
        this.state = {
            options          : listOfCategories,
            catList          : Object.keys( props.locationsUngrouped ),
            tempName         : '',
            tempAddress      : '',
            messages         : [],
            invalidFields    : [],
            checked1         : true,
            validLocationName: true,
            validAddress     : true,
        }
    }

    componentWillUpdate() {
        const { messages } = this.state;

        messages.length !== 0 ? this.setState( { messages: [] } ) : null
    }

    setSelection = ( val ) => {
        this.setState( { value: val } )
    };


    changeText = ( e, type ) => {
        switch ( type ) {
            case 'name': {
                this.setState( { tempName: e.target.value, messages: [] } );
                break;
            }
            case 'address': {
                this.setState( { tempAddress: e.target.value, messages: [] } );
                break;
            }
            default: {
                break;
            }
        }
    };


    saveLocation = () => {
        const { tempName, tempAddress, value } = this.state;
        const { map, addNewLocation } = this.props;

        const invalidFields = validateFields( {
                                                  locName   : tempName,
                                                  address   : tempAddress,
                                                  selections: value
                                              } );
        if ( invalidFields.length > 0 ) {
            this.setState( {
                               invalidFields: invalidFields
                           } )
        } else if ( find( this.props.locationsGrouped, ( loc ) => loc.name === tempName || (loc.lat === map.markerLat && loc.long === map.markerLng) ) ) {
            this.showGrowl( msgLocExist );
        } else {
            addNewLocation( {
                                cats   : value,
                                name   : tempName,
                                address: tempAddress,
                                lat    : map.markerLat,
                                long   : map.markerLng
                            } );

            this.setState( {
                               tempName     : '',
                               tempAddress  : '',
                               value        : [],
                               invalidFields: []
                           } );
            this.showGrowl( msgSaveLocation );
        }
    };

    showGrowl = ( growlMessage ) => {
        growlMessage ?
            this.setState( {
                               messages: [ growlMessage ]
                           } ) :
            this.setState( {
                               messages: []
                           } )
    };

    toggleGrouped() {
        const { checked1 } = this.state;

        this.setState( { checked1: !checked1 } );
    }



    GroupedLocations() {
        const { locationsUngrouped } = this.props;
        let i = 0;
        return (
            <PanelGroup>
                { map( locationsUngrouped, ( locations, categoryName ) => {
                    const sortedLocations = sortBy( locations, ( loc ) => loc.name.toUpperCase() );

                    return (
                        <Grid>
                            <Row>
                                <Panel collapsible header={ categoryName } eventKey={ ++i }>
                                    { sortedLocations.map( ( location ) => {
                                        return (
                                            <Location name={ location.name }
                                                      address={ location.address }
                                                      showGrowl={ this.showGrowl }
                                                      key={ categoryName + '_' + location.name }
                                                      catName={ categoryName }
                                                      long={ location.long }
                                                      lat={ location.lat }
                                            />

                                        )
                                    } ) }
                                </Panel>
                            </Row>
                        </Grid>
                    )
                } ) }
            </PanelGroup>
        )
    }

    UngroupedLocations() {
        const { locationsGrouped } = this.props;

        const sortedList = sortBy( locationsGrouped, ( loc ) => loc.name.toUpperCase() );
        return (
            <Grid>
                <Row>
                    {
                        sortedList.map( ( loc ) => (
                                            <Location name={ loc.name }
                                                      address={ loc.address }
                                                      showGrowl={ this.showGrowl }
                                                      key={ loc.category + '_' + loc.name }
                                                      catName={ loc.category }
                                                      long={ loc.long }
                                                      lat={ loc.lat }/>
                                        )
                        )
                    }
                </Row>
            </Grid>
        )
    }

    MapPanel() {
        const { invalidFields, tempName, tempAddress, value, options, checked1} = this.state;
        const { map } = this.props;

        return (
            <Row>
                <Col xs={ 6 } md={ 8 }>
                    <LocationsMap/>
                </Col>
                <Col xs={ 6 } md={ 4 }>
                    <Thumbnail>
                        <h3>New Location</h3>
                        <form>
                            <FormGroup
                                validationState={ invalidFields.indexOf( 'locName' ) === -1 ? null : 'error' }>
                                <FormControl type="text"
                                             placeholder="Location Name"
                                             value={ tempName }
                                             onChange={ ( e ) => this.changeText( e, 'name' ) }
                                />
                            </FormGroup>
                            <FormGroup
                                validationState={ invalidFields.indexOf( 'address' ) === -1 ? null : 'error' }>
                                <FormControl type="text"
                                             placeholder="Address"
                                             value={ tempAddress }
                                             onChange={ ( e ) => this.changeText( e, 'address' ) }
                                />
                            </FormGroup>
                            <FormGroup
                                validationState={ invalidFields.indexOf( 'selections' ) === -1 ? null : 'error' }>
                                <Select
                                    name="form-field-name"
                                    value={ value }
                                    options={ options }
                                    multi
                                    onChange={ this.setSelection }
                                    className={ invalidFields.indexOf( 'selections' ) === -1 ? null : 'invalidSelect' }
                                />
                            </FormGroup>
                            <FormGroup validationState={ null }>
                                <FormControl type="text"
                                             placeholder="Latitude"
                                             value={ map.markerLat }
                                             onChange={ ( e ) => this.changeText( e, '' ) }
                                             disabled
                                />
                            </FormGroup>
                            <FormGroup validationState={ null }>
                                <FormControl type="text"
                                             placeholder="Longitude"
                                             onChange={ ( e ) => this.changeText( e, '' ) }
                                             value={ map.markerLng }
                                             disabled
                                />
                            </FormGroup>
                            <InputSwitch checked={ checked1 }
                                         onChange={ () => this.toggleGrouped() }
                                         onLabel="Grouped"
                                         offLabel="Ungrouped"
                            />
                            <br/>
                            <Button bsStyle="primary" onClick={ this.saveLocation }>Add</Button>
                        </form>
                    </Thumbnail>
                </Col>
            </Row>
        );
    }

    render() {
        const { messages,  checked1 } = this.state;

        return (
            <section className="locations">
                <Growl value={ messages }/>
                <Grid>
                    { this.MapPanel() }
                    <Row>
                        <Col xs={ 12 } md={ 12 }>
                            { checked1 ? this.GroupedLocations() : this.UngroupedLocations() }
                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }
}


const mapStateToProps = ( state ) => ({
    locationsUngrouped: groupBy( sortBy( state.locations.locations, ( loc ) => loc.category ), ( loc ) => loc.category ),
    locationsGrouped  : state.locations.locations,
    cats              : state.categories.categories,
    map               : state.map,
});

export default connect( mapStateToProps, { addNewLocation } )( LocationsList )

