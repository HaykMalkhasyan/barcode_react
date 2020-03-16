import SessionStorage from "./SessionStorage";
import axios from "axios";

export default class ApiClient {
    configs = {};
    defaultConfigs = {};
    API_URI = process.env.REACT_APP_API_URL;

    constructor() {
        this.defaultConfigs = {
            headers:{},
            path:"",
            params: {}
        };
        this.resetConfigs();
    }

    getRuntimeConfigs() {
        const token = SessionStorage.get("token");
        const lang = SessionStorage.get("lang")?SessionStorage.get("lang"):'am';
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

    mergeConfigs(uri,params, headers, configs) {
        const runtimeConfigs = this.getRuntimeConfigs();
        let responseType = {};
        if (params && params.responseType) {
            responseType = params.responseType;
        }
        if(uri){
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
        return axios.get(`${this.API_URI}`, this.mergeConfigs(uri,params, headers, configs)
        ).then(response => response.data);
    }

    post(uri, data, params = {}, headers = {}, configs = { hasFile: false }) {

        return axios.post(`${this.API_URI}`,data,
            this.mergeConfigs(uri,params, headers, configs)
        ).then(response => response.data);
    }
    put(uri, data, params = {}, headers = {}, configs = { hasFile: false }) {
        return axios.put(`${this.API_URI}`,data,
            this.mergeConfigs(uri,params, headers, configs)
        ).then(response => response.data);
    }

    delete(uri, params = {}, headers = {}, configs = {}) {
        return axios.delete(`${this.API_URI}`,
            this.mergeConfigs(uri,params, headers, configs)
        ).then(response => response.data);
    }

    upload(uri, form, params = {}, headers = {}, configs = { multiple: false }) {
        let files = form.files;
        let formData = new FormData();
        Object.keys(files).map(function(key) {
            formData.append("data[" + key + "][file]", files[key]);
            formData.append("data[" + key + "][type]", form.type);
            formData.append("data[" + key + "][caption]", "caption " + key);
            formData.append("data[" + key + "][credit]", "credit " + key);

        })

        return this.post(uri, formData, params, headers, configs);
    }
}
