import { createStore, applyMiddleware } from "redux";
import createDebounce from "redux-debounced";
import { composeWithDevTools } from 'redux-devtools-extension';
import apiMiddleware from "./middlewares/apiMiddleware";
import sessionMiddleware from "./middlewares/sessionMiddleware";
import ApiClient from "../services/Api";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const apiClient = new ApiClient();

const middlewares = [
    thunk,
    createDebounce(),
    apiMiddleware(apiClient),
    sessionMiddleware()
];
const store = createStore(
    rootReducer,
   {},
    composeWithDevTools(applyMiddleware(...middlewares))
);

export { store };
