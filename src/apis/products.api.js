import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;
class ProdutsApi extends HttpClient {
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
   

    getAllCategoryConfig = ApiRoutes.Category.getAllCategory;
    addCategoryConfig = ApiRoutes.Category.addCategory;
    deleteCategoryByIdConfig = ApiRoutes.Category.deleteCategory;
    updateCategoryByIdConfig = ApiRoutes.Category.updateCategory;
    getCategoryByIdByIdConfig = ApiRoutes.Category.getCategoryById;

    getAllSubCategoryConfig = ApiRoutes.SubCategory.getAllSubCategory;
    getSubCategoryByCategoryConfig = ApiRoutes.SubCategory.getSubCategoryByCategory;
    addSubCategoryConfig = ApiRoutes.SubCategory.addSubCategory;
    deleteSubCategoryByIdConfig = ApiRoutes.SubCategory.deleteSubCategory;
    updateSubCategoryByIdConfig = ApiRoutes.SubCategory.updateSubCategory;
    getSubCategoryByIdByIdConfig = ApiRoutes.SubCategory.getSubCategoryById;

    getAllProductConfig = ApiRoutes.Product.getAllProduct;
    addProductConfig = ApiRoutes.Product.addProduct;
    deleteProductByIdConfig = ApiRoutes.Product.deleteProduct;
    updateProductByIdConfig = ApiRoutes.Product.updateProduct;
    getProductByIdByIdConfig = ApiRoutes.Product.getProductById;
   
    getAllCategory = async (reqBody) => {
        return this.instance({
            method: this.getAllCategoryConfig.Method,
            url: this.getAllCategoryConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    addCategory = async (reqBody) => {
        return this.instance({
            method: this.addCategoryConfig.Method,
            url: this.addCategoryConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    deleteCategoryById = async (reqBody) => {
        return this.instance({
            method: this.deleteCategoryByIdConfig.Method,
            url: this.deleteCategoryByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    updateCategory = async (reqBody) => {
        return this.instance({
            method: this.updateCategoryByIdConfig.Method,
            url: this.updateCategoryByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    getCategoryById = async (reqBody) => {
        return this.instance({
            method: this.getCategoryByIdByIdConfig.Method,
            url: this.getCategoryByIdByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };

    
    getAllSubCategory = async (reqBody) => {
        return this.instance({
            method: this.getAllSubCategoryConfig.Method,
            url: this.getAllSubCategoryConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    
    getSubCategoryByCategory = async (reqBody) => {
        return this.instance({
            method: this.getSubCategoryByCategoryConfig.Method,
            url: this.getSubCategoryByCategoryConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    addSubCategory = async (reqBody) => {
        return this.instance({
            method: this.addSubCategoryConfig.Method,
            url: this.addSubCategoryConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    deleteSubCategoryById = async (reqBody) => {
        return this.instance({
            method: this.deleteSubCategoryByIdConfig.Method,
            url: this.deleteSubCategoryByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    updateSubCategory = async (reqBody) => {
        return this.instance({
            method: this.updateSubCategoryByIdConfig.Method,
            url: this.updateSubCategoryByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    getSubCategoryById = async (reqBody) => {
        return this.instance({
            method: this.getSubCategoryByIdByIdConfig.Method,
            url: this.getSubCategoryByIdByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    getAllProduct = async (reqBody) => {
        return this.instance({
            method: this.getAllProductConfig.Method,
            url: this.getAllProductConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    addProduct = async (reqBody) => {
        return this.instance({
            method: this.addProductConfig.Method,
            url: this.addProductConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    deleteProductById = async (reqBody) => {
        return this.instance({
            method: this.deleteProductByIdConfig.Method,
            url: this.deleteProductByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    updateProduct = async (reqBody) => {
        return this.instance({
            method: this.updateProductByIdConfig.Method,
            url: this.updateProductByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };
    getProductById = async (reqBody) => {
        return this.instance({
            method: this.getProductByIdByIdConfig.Method,
            url: this.getProductByIdByIdConfig.Endpoint,
            headers: {},
            data: reqBody,
        });
    };

}

export default ProdutsApi;
