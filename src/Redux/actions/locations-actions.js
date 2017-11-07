import * as actionTypes from '../constants/actionTypes'

export const addNewLocation = (location) => ({
    type: actionTypes.ADD_LOCATION,
    payload: {location}
});

export const editLocation = (oldName, oldAddress, newName, newAddress) => ({
    type: actionTypes.EDIT_LOCATION,
    payload: {oldName, oldAddress, newName, newAddress}
});

export const deleteLocation = (catName, locName) => ({
    type: actionTypes.DELETE_LOCATION,
    payload: {catName, locName}
});

export const updateLocations = (oldName, newName) => ({
    type: actionTypes.UPDATE_LOCATIONS,
    payload: {oldName, newName}
});

