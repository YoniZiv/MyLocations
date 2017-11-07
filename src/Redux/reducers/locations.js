import * as actionTypes from '../constants/actionTypes';
import { remove } from 'lodash';

const initialState = {
    locations: []
};


export const locations = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_LOCATION: {
            const updatedList = [ ...state.locations, ...action.payload.location.cats.map( ( cat ) => (
                {
                    category: cat.value,
                    name    : action.payload.location.name,
                    address : action.payload.location.address,
                    long    : action.payload.location.long,
                    lat     : action.payload.location.lat
                }
            ) ) ];
            return { locations: updatedList }
        }

        case actionTypes.EDIT_LOCATION: {
            const updatedList = state.locations.map( ( loc ) => loc.name === action.payload.oldName || loc.address === action.payload.oldAddress ? {
                ...loc,
                name   : action.payload.newName,
                address: action.payload.newAddress
            } : loc );
            return { locations: updatedList }
        }

        case actionTypes.DELETE_ALL_FROM_CATEGORY: {
            const updatedList = state.locations.filter( ( location ) => (
                location.category !== action.payload.name
            ) );
            return { locations: updatedList }
        }

        case actionTypes.DELETE_LOCATION: {
            let clonedArray = state.locations.map( ( loc ) => loc );
            remove( clonedArray, ( loc ) => loc.category === action.payload.catName && loc.name === action.payload.locName );
            return { locations: clonedArray };
        }

        case actionTypes.UPDATE_LOCATIONS: {
            const updatedList = state.locations.map( ( loc ) => loc.category === action.payload.oldName ? {
                ...loc,
                category: action.payload.newName
            } : loc );
            return { locations: updatedList };
        }

        default: {
            return state
        }
    }
};
