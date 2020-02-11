import { combineReducers } from "redux";
import customizerReducer from "./customizer";
import authReducer from "./auth/reducer";
import usersReducer from "./users/reducer";
import positionReducer from "./positions/reducer";
import permissionReducer from "./permission/reducer";
import pageReducer from "./pages/reducer";
import itemReducer from './items/reducer';
import categoryReducer from './categories/reducer';
import langReducer from "./lang/reducer";

import localizeReducer from './lang/reducer';

import { reducer as toastrReducer } from "react-redux-toastr";


const rootReducer = combineReducers({
   toastr: toastrReducer, // <- Mounted at toastr.
   customizer: customizerReducer,
   auth: authReducer,
   users:usersReducer,
   positions:positionReducer,
   permission:permissionReducer,
   items:itemReducer,
   categories:categoryReducer,
   pages:pageReducer,
   lang:langReducer,
   locale:localizeReducer,
});

export default rootReducer;
