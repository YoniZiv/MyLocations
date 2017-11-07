import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';
import { changeMapLocation } from '../../Redux/actions/map-actions';


class LocationsMap extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            initialMapCenter: { lat: 32.075565, lng: 34.775729 },
            markerLat       : null,
            markerLng       : null,
        }
    }

    handleMapClick = ( mapProps, map, clickEvent ) => {
        const { changeMapLocation } = this.props;

        this.setState( {
                           markerLat: clickEvent.latLng.lat(),
                           markerLng: clickEvent.latLng.lng(),
                       } );
        changeMapLocation( this.state.markerLat, this.state.markerLng );
    };

    render() {
        const { google, map } = this.props;

        return (
            <Map google={ google }
                 zoom={ 11 }
                 className="map-stretch"
                 center={ map.initialMapCenter }
                 initialCenter={ map.initialMapCenter }
                 clickableIcons={ false }
                 onClick={ this.handleMapClick }
            >
                <Marker position={ (map.markerLng && map.markerLat) ? {
                    lat: map.markerLat,
                    lng: map.markerLng
                } : null }/>
            </Map>
        );
    }
}

const mapStateToProps = ( state ) => ({
    map: state.map
});

export default GoogleApiWrapper( {
                                     apiKey: ('AIzaSyDtV9TcN_rFgXJsxTqnBGepFB8h4UcJJl0')
                                 } )(
    connect( mapStateToProps, { changeMapLocation } )( LocationsMap )
)

