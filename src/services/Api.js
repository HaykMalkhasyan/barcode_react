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

    mergeConfigs(path, data, headers, configs) {
        const runtimeConfigs = this.getRuntimeConfigs();
        let responseType = {};

        if (data && data.responseType) {
            responseType = data.responseType;
        }
        let params = {
            path:path,
            data:data
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
                    // paramsSerializer: function(params) {
                    //     return qs.stringify(params, { arrayFormat: "brackets" });
                    // }
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

    post(uri, params = {}, headers = {}, configs = { hasFile: false }) {
        return axios.post(`${this.API_URI}`,uri,
            this.mergeConfigs(uri,params, headers, configs)
        ).then(response => response.data);
    }

    put(uri, params = {}, headers = {}, configs = { hasFile: false }) {
        return axios.put(`${this.API_URI}`,uri,
            this.mergeConfigs(uri,params, headers, configs)
        ).then(response => response.data);
    }

    delete(uri, params = {}, headers = {}, configs = {}) {
        return axios.delete(`${this.API_URI}`,
            this.mergeConfigs(uri,params, headers, configs)
        ).then(response => response.data);
    }

    upload(uri, form, data, params = {}, headers = {}, configs = { multiple: false }) {
        let files = form.files;
        if (!Array.isArray(files)) {
            files = new Array(files);
        }
        let formData = new FormData();
        // formData.append('files', files);
        files.forEach((item, i) => {
            formData.append("data[" + i + "][file]", item);
            formData.append("data[" + i + "][type]", form.type);
            formData.append("data[" + i + "][caption]", "caption " + i);
            formData.append("data[" + i + "][credit]", "credit " + i);
        });

        return this.post(uri, formData, params, headers, configs);
    }
}
