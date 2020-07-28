import Axios from "axios"
import jwt_decode from 'jwt-decode'

export async function getToken(URL, error, token) {

    try {
        const response = await Axios.post(`${URL}/token/refresh/`, token);
        const user_data = jwt_decode(response.data.access) ;
        const user = {
            firstName: user_data.firstname,
            lastName: user_data.lastname,
            user_id: user_data.user_id
        }
        const jwt = {};
        jwt.refresh = response.data.refresh;
        jwt.access = response.data.access;
        Axios.defaults.headers['Authorization'] = `JWT ${jwt.access}`;
        error.config.headers['Authorization'] = `JWT ${jwt.access}`;
        localStorage.setItem('access', jwt.access);
        localStorage.setItem('refresh', jwt.refresh);
        localStorage.setItem('user', JSON.stringify(user));
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
console.log('sdsd')
    const recursiveSearchHandler = (item, subgroup) => {

        for (let subItem of subgroup) {
            if (parseInt(subItem.id) === parseInt(item['parent_id'])) {
                searchArrayCopy.push(subItem.id);
                recursiveSearchHandler(subItem, subgroup);
                break;
            }
        }
    }
    recursiveSearchHandler(item, subgroup)

    return searchArrayCopy;
}

export function searchDown(id, subgroup, searchArray) {
    let searchArrayCopy = [...searchArray];

    const recursiveSearchHandler = (id, subgroup) => {

        for (let subItem of subgroup) {
            if (parseInt(subItem['parent_id']) === parseInt(id)) {
                searchArrayCopy.push(subItem.id);
                recursiveSearchHandler(subItem, subgroup);
                break;
            }
        }
    }
    recursiveSearchHandler(id, subgroup)

    return searchArrayCopy;
}