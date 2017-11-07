import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./reducers/root"
import middleware from "./middleware/common";
import {autoRehydrate} from "redux-persist";

const storeEnhancers = compose(
    applyMiddleware(
        middleware
    ),
    autoRehydrate()
);

const store = createStore(
    rootReducer,
    storeEnhancers
);

export default store
