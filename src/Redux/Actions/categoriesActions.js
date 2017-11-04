import * as actionTypes from '../Constants/actionTypes'

export const addNewCategory = (category) => ({
    type: actionTypes.ADD_NEW_CATEGORY,
    payload: {category},
});

export const editCategory = (oldName, newName) => ({
    type: actionTypes.EDIT_CATEGORY,
    payload: {oldName, newName}
});

export const deleteCategory = (name) => ({
    type: actionTypes.DELETE_CATEGORY,
    payload: {name}
})
export const addNewLocation = (location) => ({
    type: actionTypes.ADD_LOCATION,
    payload: {location}
})

export const editLocation = (name, address) => ({
    type: actionTypes.EDIT_LOCATION,
    payload: {name, address}
})

export const disposeCategory = (name) => ({
    type: actionTypes.DELETE_ALL_FROM_CATEGORY,
    payload: {name}
})

export const deleteLocation = (catName, locName) => ({
    type: actionTypes.DELETE_LOCATION,
    payload: {catName, locName}
})