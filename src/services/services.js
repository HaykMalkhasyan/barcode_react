import Axios from "axios"
import jwt_decode from 'jwt-decode'
import cookie from "./cookies";
import {setGroupValues} from "../Redux/characteristics/actions";

export function getHeaders(headers, params) {

    return {
        params: {
            ...params
        },
        headers: {
            "lang": cookie.get('language') || "am",
            "Content-Type": "application/json",
            "Authorization": `JWT ${cookie.get('access')}`,
            ...headers,
        }
    }
}

export async function updateToken(API_URL, error, first_error_place, first_error_value, second_error_place, second_error_value, setCallback, requestCallback, dispatch, data = null, place = null) {

    if (error.response && error.response.status === 401 && error.response.statusText === "Unauthorized") {
        const refresh_token = cookie.get('refresh');
        const new_token_data = getToken(API_URL, error, {refresh: refresh_token});
        if ((await new_token_data) === null) {
            dispatch(setCallback(first_error_place, first_error_value))
        } else if ((await new_token_data).access === cookie.get('access') && (await new_token_data).refresh === cookie.get('refresh')) {
            if (data === null) {
                if (place === null) {
                    dispatch(requestCallback())
                } else {
                    dispatch(requestCallback(place))
                }
            } else {
                if (place === null) {
                    dispatch(requestCallback(data))
                } else {
                    dispatch(requestCallback(data, place))
                }
            }
        }
    } else {
        dispatch(setCallback(second_error_place, second_error_value))
    }
}

export async function getToken(URL, error, token) {

    try {
        const response = await Axios.post(`${URL}/token/refresh/`, token);
        const user_data = jwt_decode(response.data.access);
        const user = {
            firstName: user_data['firstname'],
            lastName: user_data['lastname'],
            user_id: user_data.user_id
        };
        const jwt = {};
        jwt.refresh = response.data.refresh;
        jwt.access = response.data.access;
        Axios.defaults.headers['Authorization'] = `JWT ${jwt.access}`;
        error.config.headers['Authorization'] = `JWT ${jwt.access}`;
        cookie.set('access', jwt.access);
        cookie.set('refresh', jwt.refresh);
        cookie.set('user', JSON.stringify(user));
        return {
            access: jwt.access,
            refresh: jwt.refresh,
            user: user
        }
    } catch (e) {
        return e;
    }
}

// Characteristic subgroups search action
export function searchUp(item, subgroup, searchArray) {
    let searchArrayCopy = [...searchArray];

    for (let subItem of subgroup) {
        if (parseInt(subItem.id) === parseInt(item['parent_id']) && searchArrayCopy.indexOf(subItem.id) === -1) {
            searchArrayCopy.push(subItem.id);
            return searchUp(subItem, subgroup, searchArrayCopy);
        }
    }

    return searchArrayCopy;
}

export class type {

    static json(value) {
        try {
            JSON.parse(value)
        } catch (error) {
            return false
        }
        return true
    }
}

export class Compare {

    static objectWithObjectWithKey(array, object) {
        for (let [index, item] of Object.entries(array)) {
            for (let key in item) {
                if (item.hasOwnProperty(key) && object.hasOwnProperty(key) && parseInt(key) === +Object.keys(object)) {
                    return index
                }
            }
        }
        return false
    }
}

export class deleteInArray {

    static deleteObject([...array], object_id) {

        for (let [key, value] of Object.entries(array)) {
            if (value.id === object_id) {
                array.splice(key, 1);
                return array;
            }
        }
        return array;
    }
}

export function createRoad(sub, group, data, road) {

    if (sub.parent_id === "") {
        return `${group.name} / ${road}`;
    } else {
        for (let item of data) {
            if (item.id === +sub.parent_id) {
                return createRoad(item, group, data, `${item.name} / ${road}`)
            }
        }
    }
}

export class Barcode {

    static random(code) {

        switch (code.toLowerCase()) {
            case 'ean13': {
                let initial_barcode_13 = (Math.floor(100000000000 + Math.random() * 900000000000)).toString();
                let sum_13 = 0;
                let check_digit_13 = 0;
                for (let [key, value] of Object.entries(initial_barcode_13)) {
                    if (key % 2 === 0) {
                        sum_13 += parseInt(value)
                    } else {
                        sum_13 += (parseInt(value) * 3);
                    }
                }
                if (sum_13 % 10 !== 0) {
                    check_digit_13 = 10 - (sum_13 % 10);
                }
                initial_barcode_13 += check_digit_13;
                return initial_barcode_13;
            }
            case 'ean8': {
                let initial_barcode_8 = (Math.floor(1000000 + Math.random() * 9000000)).toString();
                let sum_8 = 0;
                let check_digit_8 = 0;
                for (let [key, value] of Object.entries(initial_barcode_8)) {
                    if (key % 2!== 0) {
                        sum_8 += parseInt(value)
                    } else {
                        sum_8 += (parseInt(value) * 3);
                    }
                }
                if (sum_8 % 10 !== 0) {
                    check_digit_8 = 10 - (sum_8 % 10);
                }
                initial_barcode_8 += check_digit_8;
                return initial_barcode_8;
            }
            default:
                return Math.floor(10000 + Math.random() * 90000);
        }
    }
}

// export function searchDown(id, subgroup, searchArray) {
//     let searchArrayCopy = [...searchArray];
//
//     const recursiveSearchHandler = (id, subgroup) => {
//
//         for (let subItem of subgroup) {
//             if (parseInt(subItem['parent_id']) === parseInt(id)) {
//                 searchArrayCopy.push(subItem.id);
//                 recursiveSearchHandler(subItem, subgroup);
//                 break;
//             }
//         }
//     };
//     recursiveSearchHandler(id, subgroup);
//
//     return searchArrayCopy;
// }