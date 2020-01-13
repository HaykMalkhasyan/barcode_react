import Cookies from "js-cookie";
import {IsJsonString} from "../utility/utils";

export default class SessionStorage {

    static get(key) {
        const value = Cookies.get(key);
        if (IsJsonString(value)) {
            return JSON.parse(value)
        }
        return value;
    }

    static set(key, value, options = {}) {
        Cookies.set(key, value);
    }

    static remove(key, options = {}) {
        return Cookies.remove(key, options);
    }

    static getAll() {
        return Cookies.get();
    }
    
}