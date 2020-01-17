import SessionStorage from '../services/SessionStorage';
export const saveSession = (key,{token,user}, withUser = true) => {
    const options = {
        path: '/',
        expires: new Date( Date.now()),
    };
    SessionStorage.set('token', token, options);
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
    SessionStorage.remove('token', options);
    SessionStorage.remove('user', options);
};

