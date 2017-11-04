import * as actionTypes from "../Constants/actionTypes";
import {disposeCategory} from "../Actions/categoriesActions";

const middleware = ({dispatch}) => next => action => {
    switch(action.type){

        case actionTypes.DELETE_CATEGORY: {
            dispatch(disposeCategory(action.payload.name))
        }

        default:
            break;
    }
    return next(action);
};

export default middleware;
