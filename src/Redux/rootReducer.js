import {combineReducers} from "redux"
import authReducer from "./auth/reducer";
import resetPasswordReducer from "./recoverPassword/reducer";
import registrationReducer from "./registration/reducer";
import pageReducer from "./pages/reducer";
import characteristicsReducer from "./characteristics/reducer";
import productsReducer from "./products/reducer";
import filtersReducer from "./filtersContainer/reducer";
import languageReducer from "./language/reducer";
import barcodeReducer from "./barcode/reducer";
import priceReducer from "./price/reducer";

export default combineReducers({
    auth: authReducer,
    resetPassword: resetPasswordReducer,
    registration: registrationReducer,
    page: pageReducer,
    characteristics: characteristicsReducer,
    products: productsReducer,
    filters: filtersReducer,
    language: languageReducer,
    barcode: barcodeReducer,
    price: priceReducer,
})