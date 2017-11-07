import * as actionTypes from '../constants/actionTypes';
import * as _ from 'lodash';

const initialState = {
    categories: []
};

export const categories = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_NEW_CATEGORY: {
            return { categories: [ ...state.categories, action.payload.category ] };
        }

        case actionTypes.EDIT_CATEGORY: {
            const updatedList = state.categories.map( ( cat ) => cat === action.payload.oldName ? action.payload.newName : cat );
            return { categories: updatedList }
        }

        case actionTypes.DELETE_CATEGORY: {
            let clonedList = state.categories.map( ( cat ) => cat );
            _.remove( clonedList, ( catName ) => catName === action.payload.name );
            return { categories: clonedList };
        }

        default: {
            return state;
        }
    }
};


