import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../Redux/Reducers/root"
import middleware from "./Middleware/common";
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
)

export default store
