import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;
class UserApi extends HttpClient {
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


    getAllUserConfig = ApiRoutes.User.getAllUser;
    addUserConfig = ApiRoutes.User.addUser;
    deleteUserByIdConfig = ApiRoutes.User.deleteUser;
    updateUserByIdConfig = ApiRoutes.User.updateUser;
    getUserByIdByIdConfig = ApiRoutes.User.getUserById;
    getAllUser = async (reqBody) => {
        return this.instance({
            method: this.getAllUserConfig.Method,
            url: this.getAllUserConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    addUser = async (reqBody) => {
        return this.instance({
            method: this.addUserConfig.Method,
            url: this.addUserConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    deleteUserById = async (reqBody) => {
        return this.instance({
            method: this.deleteUserByIdConfig.Method,
            url: this.deleteUserByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    updateUser = async (reqBody) => {
        return this.instance({
            method: this.updateUserByIdConfig.Method,
            url: this.updateUserByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    getUserById = async (reqBody) => {
        return this.instance({
            method: this.getUserByIdByIdConfig.Method,
            url: this.getUserByIdByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };

}

export default UserApi;
