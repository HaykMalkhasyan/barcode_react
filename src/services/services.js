import Axios from "axios"
import jwt_decode from 'jwt-decode'
import cookie from "./cookies";

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

    static objectWithObject(array, object) {

        for (let item of array) {
            for (let key in item) {
                if (item.hasOwnProperty(key) && object.hasOwnProperty(key) && item[key] === object[key]) {
                    return false
                }
            }
        }
        return true
    }

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