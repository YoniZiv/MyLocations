import * as actionTypes from '../Constants/actionTypes'

export const addNewCategory = (category) => ({
    type: actionTypes.ADD_NEW_CATEGORY,
    payload: {category},
});

export const editCategory = (oldName, newName) => ({
    type: actionTypes.EDIT_CATEGORY,
    payload: {oldName,newName}
})