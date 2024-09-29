import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;
class ServicesApi extends HttpClient {
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


    getAllServiceConfig = ApiRoutes.Service.getAllService;
    addServiceConfig = ApiRoutes.Service.addService;
    deleteServiceByIdConfig = ApiRoutes.Service.deleteService;
    updateServiceByIdConfig = ApiRoutes.Service.updateService;
    getServiceByIdByIdConfig = ApiRoutes.Service.getServiceById;
    getAllService = async (reqBody) => {
        return this.instance({
            method: this.getAllServiceConfig.Method,
            url: this.getAllServiceConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    addService = async (reqBody) => {
        return this.instance({
            method: this.addServiceConfig.Method,
            url: this.addServiceConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    deleteServiceById = async (reqBody) => {
        return this.instance({
            method: this.deleteServiceByIdConfig.Method,
            url: this.deleteServiceByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    updateService = async (reqBody) => {
        return this.instance({
            method: this.updateServiceByIdConfig.Method,
            url: this.updateServiceByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    getServiceById = async (reqBody) => {
        return this.instance({
            method: this.getServiceByIdByIdConfig.Method,
            url: this.getServiceByIdByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };

}

export default ServicesApi;
