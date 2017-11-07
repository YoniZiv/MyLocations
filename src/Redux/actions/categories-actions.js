import * as actionTypes from '../constants/actionTypes'

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
});

export const disposeCategory = (name) => ({
    type: actionTypes.DELETE_ALL_FROM_CATEGORY,
    payload: {name}
});
