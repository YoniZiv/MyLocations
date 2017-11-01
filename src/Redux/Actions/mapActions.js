import * as actionTypes from '../Constants/actionTypes'
export const changeMapLocation = (lat,long) => ({
    type: actionTypes.CHANGE_MAP_LOCATION,
    payload: {lat, long},
});