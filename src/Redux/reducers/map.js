import * as actionTypes from '../constants/actionTypes';

const initialState = {
    markerLat       : 32.075565,
    markerLng       : 34.775729,
    initialMapCenter: { lat: 32.075565, lng: 34.775729 }
};

export const map = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CHANGE_MAP_LOCATION: {
            return {
                markerLat       : action.payload.lat,
                markerLng       : action.payload.long,
                initialMapCenter: { lat: action.payload.lat, lng: action.payload.long }
            }
        }
        default: {
            return state;
        }

    }
};
