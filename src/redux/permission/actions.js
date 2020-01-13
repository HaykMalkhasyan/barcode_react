import { GET_PERMISSIONS_REQUEST,GET_PERMISSIONS_FAIL, GET_PERMISSIONS_SUCCESS} from "./actionTypes";
let cols =  'id,name';

export const getPermissions = () => {
    return {
        types: [GET_PERMISSIONS_REQUEST,GET_PERMISSIONS_FAIL,GET_PERMISSIONS_SUCCESS],
        promise: (apiClient) => apiClient.get(`User/Permission`, JSON.stringify({ cols }))
    }
}