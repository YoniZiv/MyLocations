import * as actionTypes from '../constants/actionTypes';
import { updateLocations } from '../actions/locations-actions';
import { disposeCategory } from '../actions/categories-actions';

const middleware = ( { dispatch } ) => next => action => {
    switch ( action.type ) {
        case actionTypes.DELETE_CATEGORY: {
            dispatch( disposeCategory( action.payload.name ) );
            break
        }
        case actionTypes.EDIT_CATEGORY: {
            dispatch( updateLocations( action.payload.oldName, action.payload.newName ) );
            break
        }
        default:
            break;
    }
    return next( action );
};

export default middleware;

