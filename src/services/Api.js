import SessionStorage from "./SessionStorage";
import axios from "axios";
import {destroySession, getSession, saveSession} from "../utility/session";
import jwt_decode from 'jwt-decode'

export default class ApiClient {
    configs = {};
    defaultConfigs = {};
    API_URI = process.env.REACT_APP_API_URL;

    constructor() {
        this.defaultConfigs = {
            headers: {},
            path: "",
            params: {}
        };
        this.resetConfigs();
    }

    getRuntimeConfigs() {
        const token = SessionStorage.get("token");
        const lang = SessionStorage.get("lang") ? SessionStorage.get("lang") : 'am';
        let headers = {
            "Content-Type": "application/json",
            "Lang": lang,
        };
        if (token) {
            headers["Token"] = token;
        }
        return Object.assign({}, this.configs, {
            headers
        });
    }

    resetConfigs() {
        this.configs = Object.assign({}, this.defaultConfigs);
    }

    setConfig(key, value) {
        this.configs = Object.assign({}, this.configs, {
            [key]: value
        });
    }

    mergeConfigs(uri, params, headers, configs) {
        const runtimeConfigs = this.getRuntimeConfigs();
        let responseType = {};
        if (params && params.responseType) {
            responseType = params.responseType;
        }
        if (uri) {
            params.path = uri;
        }
        return Object.assign(
            {},
            runtimeConfigs,
            Object.assign(
                {},
                configs,
                {
                    ...responseType,
                    params: Object.assign({}, runtimeConfigs.params, params),
                    headers: Object.assign({}, runtimeConfigs.headers, headers),
                }
            )
        );
    }

    static cancelToken() {
        const CancelToken = axios.CancelToken;
        return CancelToken.source();
    }

    get(uri, params = {}, headers = {}, configs = {}) {
        return axios.get(`${this.API_URI}`, this.mergeConfigs(uri, params, headers, configs)
        ).then(response => response.data);
    }



    post(uri, data, params = {}, headers = {}, configs = {hasFile: false}) {
        return axios.post(`${this.API_URI}`, data,
            this.mergeConfigs(uri, params, headers, configs)
        ).then(response => response.data);
    }


    put(uri, data, params = {}, headers = {}, configs = {hasFile: false}) {
        return axios.put(`${this.API_URI}`, data,
            this.mergeConfigs(uri, params, headers, configs)
        ).then(response => response.data);

    }

    delete(uri, params = {}, headers = {}, configs = {}) {
        return axios.delete(`${this.API_URI}`,
            this.mergeConfigs(uri, params, headers, configs)
        ).then(response => response.data);
    }

    upload(uri, form, params = {}, headers = {}, configs = {multiple: false}) {
        let files = form.files;
        let formData = new FormData();
        /*method map I change to forEach*/
        Object.keys(files).forEach(
            key => {
                formData.append("data[" + key + "][file]", files[key]);
                formData.append("data[" + key + "][type]", form.type);
                formData.append("data[" + key + "][caption]", "caption " + key);
                formData.append("data[" + key + "][credit]", "credit " + key);

            })

        return this.post(uri, formData, params, headers, configs);
    }


    /*----------------------------------------*/

    ggetRuntimeConfigs() {
        const access = SessionStorage.get("access");
        const lang = SessionStorage.get("lang") ? SessionStorage.get("lang") : 'am';
        let headers = {
            "Content-Type": "application/json",
            "Lang": lang,
        };
        if (access) {
            headers["Authorization"] = `JWT ${access}`;
        }
        return Object.assign({}, {
            headers
        });
    }

    mmergeConfigs(headers) {
        const runtimeConfigs = this.ggetRuntimeConfigs();
        return Object.assign(
            {},
            runtimeConfigs,
            Object.assign(
                {},
                {
                    headers: Object.assign({}, runtimeConfigs.headers),
                }
            )
        );
    }

     async postt(uri, data) {

         try {
             const response = await axios.post(uri, data);
             axios.defaults.headers['Authorization'] = "JWT " + data.access;
             let user_data = jwt_decode(response.data.access);
             let user = {
                 firstname: user_data.firstname,
                 lastname: user_data.lastname,
                 user_id: user_data.user_id
             }
             response.data.user = user
             return response.data;
         } catch (e) {
             console.log('Error !!!');
         }
    }

    async gett(uri, headers = {}, configs = {}) {
        let URL = uri;
        let HEADERS = headers;
        let CONFIG = configs
        try {
            const response = await axios.get(`${URL}`, this.mmergeConfigs(HEADERS, CONFIG));
            return response.data
        } catch (error) {
            if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                const refresh_token = getSession('refresh');

                return axios.post('/token/refresh/', {refresh: refresh_token})
                    .then((response) => {
                        let user_data = jwt_decode(response.data.access);
                        let user = {
                            firstname: user_data.firstname,
                            lastname: user_data.lastname,
                            user_id: user_data.user_id
                        }
                        response.data.user = user;

                        axios.defaults.headers['Authorization'] = "JWT " + response.data.access;
                        error.config.headers['Authorization'] = "JWT " + response.data.access;

                        saveSession('auth', response.data);
                        return this.gett(URL, HEADERS, CONFIG)
                    })
                    .catch(err => {
                        console.log('Error: ',err)
                    });
            }
        }
    }

    setLogout() {
        destroySession()
    }



    async deletee(uri, data, headers = {}, configs = {}) {
        let URL = uri;
        let HEADERS = headers;
        let CONFIG = configs
        await axios.delete(URL,
            this.mmergeConfigs(HEADERS, CONFIG)
        )
        return data
    }

   async putt(uri, data, headers = {}, configs = {}) {
        let URL = uri;
        let HEADERS = headers;
        let CONFIG = configs;
        try {
            const response = await axios.put(URL, data, this.mmergeConfigs(HEADERS, CONFIG));
            return response.data;
        } catch (error) {
            if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                const refresh_token = getSession('refresh');

                return axios.post('/token/refresh/', {refresh: refresh_token})
                    .then((response) => {
                        let user_data = jwt_decode(response.data.access);
                        let user = {
                            firstname: user_data.firstname,
                            lastname: user_data.lastname,
                            user_id: user_data.user_id
                        }
                        response.data.user = user;

                        axios.defaults.headers['Authorization'] = "JWT " + response.data.access;
                        error.config.headers['Authorization'] = "JWT " + response.data.access;

                        saveSession('auth', response.data);
                        return this.putt(URL, HEADERS, CONFIG)
                    })
                    .catch(err => {
                        console.log('Error: ',err)
                    });
            }
        }
    }
}


