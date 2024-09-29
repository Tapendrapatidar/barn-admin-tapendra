import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;
class BarnApi extends HttpClient {
    constructor() {
        super(baseURL);
        this._initializeRequestInterceptor();
        this._initializeResponseInterceptor();
    }

    _initializeRequestInterceptor = () => {
        // console.log(import.meta.env.VITE_AUTH_KEY)
        this.instance.interceptors.request.use((config) => {
            config.headers["Authorization"] = `Bearer ${getTokenLocal()}`;
            config.headers["authkey"] = import.meta.env.VITE_AUTH_KEY;
            return config;
        });
    };

    _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
            (response) => {
                return Promise.resolve(response);
            }
        );
    };


    getAllBarnConfig = ApiRoutes.Barn.getAllBarn;
    addBarnConfig = ApiRoutes.Barn.addBarn;
    deleteBarnByIdConfig = ApiRoutes.Barn.deleteBarn;
    updateBarnByIdConfig = ApiRoutes.Barn.updateBarn;
    getBarnByIdByIdConfig = ApiRoutes.Barn.getBarnById;
    getAllBarn = async (reqBody) => {
        return this.instance({
            method: this.getAllBarnConfig.Method,
            url: this.getAllBarnConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    addBarn = async (reqBody) => {
        return this.instance({
            method: this.addBarnConfig.Method,
            url: this.addBarnConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    deleteBarnById = async (reqBody) => {
        return this.instance({
            method: this.deleteBarnByIdConfig.Method,
            url: this.deleteBarnByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    updateBarn = async (reqBody) => {
        return this.instance({
            method: this.updateBarnByIdConfig.Method,
            url: this.updateBarnByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    getBarnById = async (reqBody) => {
        return this.instance({
            method: this.getBarnByIdByIdConfig.Method,
            url: this.getBarnByIdByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };

}

export default BarnApi;
