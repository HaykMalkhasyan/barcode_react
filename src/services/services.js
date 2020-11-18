import Axios from "axios"
import jwt_decode from 'jwt-decode'
import cookie from "./cookies";


export function getMissing(arr){
    if(!arr.length){
      return 1
    }
      let length = arr.length
      arr.sort((x,y)=>x-y)
      if(arr[0]!==1){
        return 1
      }
      for(let i=0; i<length; i++){
          if(arr[i+1]-arr[i]!==1){
          return arr[i] + 1
      }
    }
      return arr.length
  }

export const get_float_num_length = (num) => {
    num = num.toString()
    if(num.includes(".")){
        let arr = num.split(".")
        if(arr[1].includes("e-")){
            let arrn = arr[1].split("e-")
            return +arrn[1]+arrn[0].length
        }else if(num.includes("e+")){
            let arrn = arr[1].split("e+")
            return +arrn[1]+arrn[0].length
        }
        return arr[1].length
    }else if(num.includes("e-")){
        let arr = num.split("e-")
        return arr[1]
    }else if(num.includes("e+")){
        let arr = num.split("e+")
        return arr[1]
    }else{
        return 0 
    }
 }

export function add(x, y){
    x=+x;
    y=+y;
    if(x!==x || y!==y){
        return NaN
    }
    if(Number.isInteger(x) && Number.isInteger(y)){
        return x + y
    }else{
        return +(x+y).toFixed(Math.max(get_float_num_length(x), get_float_num_length(y)))
    }
}

export function mult(x, y){
    x=+x;
    y=+y;
    if(x!==x || y!==y){
        return NaN
    }
    if(Number.isInteger(x) && Number.isInteger(y)){
        return x * y
    }else{
        let length = get_float_num_length(x) + get_float_num_length(y)
        length = length > 4 ? 4 : length  
        return +(x*y).toFixed(get_float_num_length(x) + get_float_num_length(y))
    }
}

export function div(x, y){
    x=+x;
    y=+y;
    if(x!==x || y!==y){
        return NaN
    }
    let res = x / y;
    if(Number.isInteger(res)){
        return res
    }else{
        let length = Math.max(get_float_num_length(res))
        length = length > 4 ? 4 : length  
        return +res.toFixed(length)
    }
}

export function sub(x, y){
    x=+x;
    y=+y;
    if(x!==x || y!==y){
        return NaN
    }
    if(Number.isInteger(x) && Number.isInteger(y)){
        return x - y
    }else{
        return +(x-y).toFixed(Math.max(get_float_num_length(x), get_float_num_length(y)))
    }
}




 export const fixNumber = (num) => {
    num = +num
     if(Number.isInteger(num)){
         return num
     }else if(num===num){
         return num
     }
 }



export const getFullDate = (milliseconds, addMonth=true) => {
    let strDate = new Date(Date.now())
    if(milliseconds){
        strDate = new Date(milliseconds)
    }
    let year = strDate.getFullYear()
    let month = strDate.getMonth()+1
    let day = strDate.getDate()
    let hour = strDate.getHours()
    let minutes = strDate.getMinutes()
    let seconds = strDate.getSeconds()
    day = day < 10 ? "0" + day : day
    hour = hour < 10 ? "0" + hour : hour
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    return `${year}-${month+addMonth}-${day} ${hour}:${minutes}:${seconds}`
}

export function findItem(data, itemId) {
    let array = [];
    for (let item of data) {
        if (parseInt(item.parent_id) === parseInt(itemId)) {
            array.push({
                id: item.id,
                cat_id: item.cat_id,
                parent_id: item.parent_id,
                sort: item.sort,
                name: item[`name_${cookie.get('language') || 'am'}`],
                children: findItem(data, item.id)
            })
        }
    }
    return array
}

export function checkItem(array, elem) {
    for (let item of array) {
        if (item.id === elem.id && item.name === elem.name) {
            return false
        }
    }
    return true
}

export function getHeaders(headers, params) {

    return {
        params: {
            ...params
        },
        headers: {
            "Content-Type": "application/json",
            "lang": cookie.get('language') || "am",
            "Authorization": `JWT ${cookie.get('access')}`,
            ...headers,
        }
    }
}

export async function updateToken(API_URL, error, first_error_place, first_error_value, second_error_place, second_error_value, setCallback, requestCallback, dispatch, data = null, catId = null, place = null) {

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
                if (catId !== null) {
                    dispatch(requestCallback(data, catId))
                } else if (place === null) {
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

export function createRoad(data, road) {

    if (data.parent.id === null) {
        return road ? `/ ${data.name} / ${road}` : `/ ${data.name}`;
    }
    return road ?`${createRoad(data.parent, `${data.name} `)} / ${road}` : createRoad(data.parent, `${data.name} `)
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