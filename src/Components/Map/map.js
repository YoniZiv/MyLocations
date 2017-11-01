import React from 'react';
import './map.css';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import { changeMapLocation } from '../../redux/actions/locations';
import { connect } from 'react-redux';


class LocationsMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialMapCenter: {lat: 32.075565, lng: 34.775729},
            markerLat: null,
            markerLng: null,
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.coordinates !== nextProps.coordinates) {
    //         if(nextProps.coordinates) {
    //             this.setState({
    //                 markerLat: nextProps.coordinates.lat, markerLng: nextProps.coordinates.lng,
    //                 initialMapCenter: {lat: nextProps.coordinates.lat, lng: nextProps.coordinates.lng}
    //             });
    //         }
    //     }
    // }

    handleMapClick = (mapProps, map, clickEvent) => {
        // console.log('works')
        this.setState({
            markerLat: clickEvent.latLng.lat(),
            markerLng: clickEvent.latLng.lng(),
            initialMapCenter: {lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng()}
        });
    //     // this.props.changeMapLocation({
    //     //     lat: clickEvent.latLng.lat(),
    //     //     lng: clickEvent.latLng.lng()
    //     // });
    };


    render() {
        const { google  } = this.props;
        const style = {
            width: '100%',
            height: '365px',

        };
        const {initialMapCenter, markerLng, markerLat} = this.state;

        return (
            <Map google={google}
                 zoom={11}
                 // containerStyle={{position: 'absolute', width: '40%', height:'auto'}}
                 style={style}
                 center={ initialMapCenter }
                 initialCenter={ initialMapCenter }
                 clickableIcons={false}
                 onClick={this.handleMapClick}>

                {/*<Marker position={ {lat: 31.778561, lng: 34.635831} }/>*/}
                <Marker position={ (markerLng && markerLat) ? {lat: markerLat, lng: markerLng} : null}/>

            </Map>
        );

    }
}
//
// const mapStateToProps = (state) => ({
//     coordinates: state.toJS().locations.coordinates
// });


export default GoogleApiWrapper({
    apiKey: ('AIzaSyAqIGHdKR6_yfOzkkZKtVJk9VRMyvH45fQ')
})(
    // connect(null, null)(LocationsMap)
    LocationsMap
)
