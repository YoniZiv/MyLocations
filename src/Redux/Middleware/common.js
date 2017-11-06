import * as actionTypes from "../Constants/actionTypes";
import {disposeCategory, updateLocations} from "../Actions/categoriesActions";

const middleware = ({dispatch}) => next => action => {
    switch(action.type){

        case actionTypes.DELETE_CATEGORY: {
            dispatch(disposeCategory(action.payload.name));
            break
        }

        case actionTypes.EDIT_CATEGORY: {
            dispatch(updateLocations(action.payload.oldName, action.payload.newName));
            break
        }
        default:
            break;
    }
    return next(action);
};

export default middleware;
