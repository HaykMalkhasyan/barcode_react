import SessionStorage from '../services/SessionStorage';
import  jwt  from 'jwt-simple';
import jwt_decode from 'jwt-decode'
export const saveSession = (key,{access, refresh,user}, withUser = true) => {
    const options = {
        path: '/',
        expires: new Date( Date.now()),
    };
    SessionStorage.set('access', access, options);
    SessionStorage.set('refresh', refresh, options);
    if (withUser) {
        SessionStorage.set('user', user, options);
    }
};

export const getSession = (key) => {
    let result = SessionStorage.get(key);

    return result;
}

export const destroySession = () => {
    const options = {
        path: '/'
    };
    SessionStorage.remove('access', options);
    SessionStorage.remove('refresh', options);
    SessionStorage.remove('user', options);
};

