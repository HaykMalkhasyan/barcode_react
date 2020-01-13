import SessionStorage from '../services/SessionStorage';
// import history from "../history";

export const saveSession = (key,{token,user}, withUser = true) => {
    const options = {
        path: '/',
        expires: new Date( Date.now()),
    };
    SessionStorage.set('token', token, options);
    if (withUser) {
        SessionStorage.set('user', user, options);
    }
    // history.push("/index")
    // SessionStorage.set(key, value, options);


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

//
// export const saveUserDataSession = (data) => {
//     const now = new Date();
//     const time = now.getTime();
//     const expireTime = time + 1000 * 36000;
//     now.setTime(expireTime);
//     const rememberOptions = {
//         path: '/',
//         expires: new Date(now * 1000 + (30 * 24 * 3600 * 1000))
//     };
//     SessionStorage.set('userData', data, rememberOptions);
// };
//
// export const destroySession = () => {
//     const options = {
//         path: '/'
//     };
//
//     SessionStorage.remove('token', options);
//     SessionStorage.remove('tokenExpiresAt', options);
//     SessionStorage.remove('refreshToken', options);
//     SessionStorage.remove('user', options);
//     SessionStorage.remove('sessionId', options);
// };
//
// export const destroyTokenSession = () => {
//     const options = {
//         path: '/'
//     };
//     SessionStorage.remove('token', options);
//     SessionStorage.remove('tokenExpiresAt', options);
//     SessionStorage.remove('refreshToken', options);
// };

