import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../Redux/Reducers/root"
import middleware from "./Middleware/common";

const storeEnhancers = compose(
    applyMiddleware(
        middleware
    )
);

const store = createStore(
    rootReducer,
    storeEnhancers
)

export default store
