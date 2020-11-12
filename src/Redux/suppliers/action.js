import cookie from "../../services/cookies";
import Axios from "axios";
import {getHeaders} from "../../services/services";
import {SET_ALL_SUPPLIERS, SET_PROGRESS, SET_SELECTED} from "./actionTypes";

const API_URL = process.env.REACT_APP_API_URL;

export function getSuppliers() {

    return async dispatch => {
        dispatch(changeProgressStatus(true));
        if (cookie.get('access')) {
            try {
                const response = await Axios.get(API_URL, getHeaders({}, {path: "Providers/Provider"}));
                dispatch(setSuppliers(response.data.data))
            } catch (error) {
                console.log("suppliers error")
            }
        }
    }
}

export function setSuppliers(data) {

    return {
        type: SET_ALL_SUPPLIERS, data
    }
}

/*----------------------------------------------------------*/

export function changeProgressStatus(bool_status) {

    return {
        type: SET_PROGRESS, bool_status
    }
}

export function setSelected(data) {

    return {
        type: SET_SELECTED, data
    }
}