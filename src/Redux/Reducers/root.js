import {combineReducers} from "redux";
import {categories} from "./categories";
import {locations} from "./locations";
import {map} from "./map";

const rootReducer = combineReducers({
    categories,
    locations,
    map
})

export default rootReducer




// export default ();

//asdasdasdas