import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;
class AdminApi extends HttpClient {
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


    getAllAddAdminConfig = ApiRoutes.Admin.getAllAdmins;
    getAddAdminConfig = ApiRoutes.Admin.addAdmin;
    deleteAdminByIdConfig = ApiRoutes.Admin.deleteAdmin;
    updateAdminByIdConfig = ApiRoutes.Admin.updateAdmin;
    getAdminByIdByIdConfig = ApiRoutes.Admin.getAdminById;
    getAllAdmins = async (reqBody) => {
        return this.instance({
            method: this.getAllAddAdminConfig.Method,
            url: this.getAllAddAdminConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    addAdmin = async (reqBody) => {
        return this.instance({
            method: this.getAddAdminConfig.Method,
            url: this.getAddAdminConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    deleteAdminById = async (reqBody) => {
        return this.instance({
            method: this.deleteAdminByIdConfig.Method,
            url: this.deleteAdminByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    updateAdmin = async (reqBody) => {
        return this.instance({
            method: this.updateAdminByIdConfig.Method,
            url: this.updateAdminByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    getAdminById = async (reqBody) => {
        return this.instance({
            method: this.getAdminByIdByIdConfig.Method,
            url: this.getAdminByIdByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };

}

export default AdminApi;
