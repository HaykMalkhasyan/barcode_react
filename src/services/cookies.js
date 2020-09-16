import Cookies from 'js-cookie'
import {type} from "./services"

export default class cookie {

    static get(key) {
        return type.json(Cookies.get(key)) ?
            JSON.parse(Cookies.get(key))
            :
            Cookies.get(key)
    }

    static getAll() {
        return Cookies.get()
    }

    static set(key, value) {
        Cookies.set(key, value)
    }

    static remove(key) {
        return Cookies.remove(key)
    }
}