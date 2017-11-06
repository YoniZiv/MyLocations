import React from 'react';
import './map.css';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import { changeMapLocation } from '../../redux/actions/locations';
import { connect } from 'react-redux';
import {changeMapLocation} from "../../Redux/Actions/mapActions";


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

        });
        this.props.changeMapLocation(this.state.markerLat, this.state.markerLng);

    //     // this.props.changeMapLocation({
    //     //     lat: clickEvent.latLng.lat(),
    //     //     lng: clickEvent.latLng.lng()
    //     // });
    };


    render() {
        const { google  } = this.props;
        const style = {
            width: '100%',
            height: '391px',

        };

        return (
            <Map google={google}
                 zoom={11}
                 // containerStyle={{position: 'absolute', width: '40%', height:'auto'}}
                 style={style}
                 center={ this.props.map.initialMapCenter }
                 initialCenter={ this.props.map.initialMapCenter }
                 clickableIcons={false}
                 onClick={this.handleMapClick}>

                {/*<Marker position={ {lat: 31.778561, lng: 34.635831} }/>*/}
                <Marker position={ (this.props.map.markerLng && this.props.map.markerLat) ? {lat: this.props.map.markerLat, lng: this.props.map.markerLng} : null}/>

            </Map>
        );

    }
}

const mapStateToProps = (state) => ({
    map: state.map
});



export default GoogleApiWrapper({
    apiKey: ('AIzaSyDtV9TcN_rFgXJsxTqnBGepFB8h4UcJJl0')
})(
    connect(mapStateToProps, { changeMapLocation })(LocationsMap)
)

