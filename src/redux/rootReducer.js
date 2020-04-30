import { combineReducers } from "redux";
import customizerReducer from "./customizer";
import todoReducer from "./todo/reducer";
import authReducer from "./auth/reducer";
import usersReducer from "./users/reducer";
import suppliersReducer from "./suppliers/reducer";
import positionReducer from "./positions/reducer";
import permissionReducer from "./permission/reducer";
import pageReducer from "./pages/reducer";
import productReducer from './products/reducer';
import groupReducer from './group/reducer';
import langReducer from "./lang/reducer";

import { reducer as toastrReducer } from "react-redux-toastr";
import currencyReducer from "./currency/reducer";


const rootReducer = combineReducers({
   toastr: toastrReducer, // <- Mounted at toastr.
   customizer: customizerReducer,
   todo: todoReducer,
   auth: authReducer,
   users:usersReducer,
   suppliers:suppliersReducer,
   positions:positionReducer,
   permission:permissionReducer,
   products:productReducer,
   group:groupReducer,
   pages:pageReducer,
   languages:langReducer,
   currency: currencyReducer
});

export default rootReducer;
