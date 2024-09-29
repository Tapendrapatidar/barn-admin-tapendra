export const HttpMethod = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Patch: "PATCH",
  Delete: "DELETE",
};

const ApiRoutes = {
  Auth: {
    Login: {
      Endpoint: "/login",
      Method: HttpMethod.Post,
    },
  },
  User: {
    getAlluser: {
      Endpoint: "/getAlluser",
      Method: HttpMethod.Post,
    }
  },
  Admin: {
    getAllAdmins: {
      Endpoint: "/getAllAdmins",
      Method: HttpMethod.Post,
    },
    addAdmin: {
      Endpoint: "/addAdmin",
      Method: HttpMethod.Post,
    },
    deleteAdmin: {
      Endpoint: "/deleteAdminById",
      Method: HttpMethod.Post,
    },
    updateAdmin: {
      Endpoint: "/updateAdmin",
      Method: HttpMethod.Post,
    },
    getAdminById: {
      Endpoint: "/getAdminById",
      Method: HttpMethod.Post,
    },

  },
  Barn: {
    getAllBarn: {
      Endpoint: "/getAllBarn",
      Method: HttpMethod.Post,
    },
    addBarn: {
      Endpoint: "/addBarn",
      Method: HttpMethod.Post,
    },
    deleteBarn: {
      Endpoint: "/deleteBarnById",
      Method: HttpMethod.Post,
    },
    updateBarn: {
      Endpoint: "/updateBarnById",
      Method: HttpMethod.Post,
    },
    getBarnById: {
      Endpoint: "/getBarnById",
      Method: HttpMethod.Post,
    },

  },
  Service: {
    getAllService: {
      Endpoint: "/getAllService",
      Method: HttpMethod.Post,
    },
    addService: {
      Endpoint: "/addService",
      Method: HttpMethod.Post,
    },
    deleteService: {
      Endpoint: "/deleteServiceById",
      Method: HttpMethod.Post,
    },
    updateService: {
      Endpoint: "/updateServiceById",
      Method: HttpMethod.Post,
    },
    getServiceById: {
      Endpoint: "/getServiceById",
      Method: HttpMethod.Post,
    },

  },
  User: {
    getAllUser: {
      Endpoint: "/getAllUser",
      Method: HttpMethod.Post,
    },
    addUser: {
      Endpoint: "/addUser",
      Method: HttpMethod.Post,
    },
    deleteUser: {
      Endpoint: "/deleteUserById",
      Method: HttpMethod.Post,
    },
    updateUser: {
      Endpoint: "/updateUserById",
      Method: HttpMethod.Post,
    },
    getUserById: {
      Endpoint: "/getUserById",
      Method: HttpMethod.Post,
    },

  },
  Category: {
    getAllCategory: {
      Endpoint: "/getAllCategory",
      Method: HttpMethod.Post,
    },
    addCategory: {
      Endpoint: "/addCategory",
      Method: HttpMethod.Post,
    },
    deleteCategory: {
      Endpoint: "/deleteCategoryById",
      Method: HttpMethod.Post,
    },
    updateCategory: {
      Endpoint: "/updateCategoryById",
      Method: HttpMethod.Post,
    },
    getCategoryById: {
      Endpoint: "/getCategoryById",
      Method: HttpMethod.Post,
    },

  },
  SubCategory: {
    getAllSubCategory: {
      Endpoint: "/getAllSubCategory",
      Method: HttpMethod.Post,
    },
    getSubCategoryByCategory: {
      Endpoint: "/getSubCategoriesForCategoryId",
      Method: HttpMethod.Post,
    },
    addSubCategory: {
      Endpoint: "/addSubCategory",
      Method: HttpMethod.Post,
    },
    deleteSubCategory: {
      Endpoint: "/deleteSubCategoryById",
      Method: HttpMethod.Post,
    },
    updateSubCategory: {
      Endpoint: "/updateSubCategoryById",
      Method: HttpMethod.Post,
    },
    getSubCategoryById: {
      Endpoint: "/getSubCategoryById",
      Method: HttpMethod.Post,
    },

  },
  Product: {
    getAllProduct: {
      Endpoint: "/getAllProduct",
      Method: HttpMethod.Post,
    },
    addProduct: {
      Endpoint: "/addProduct",
      Method: HttpMethod.Post,
    },
    deleteProduct: {
      Endpoint: "/deleteProductById",
      Method: HttpMethod.Post,
    },
    updateProduct: {
      Endpoint: "/updateProductById",
      Method: HttpMethod.Post,
    },
    getProductById: {
      Endpoint: "/getProductById",
      Method: HttpMethod.Post,
    },

  },
  Other: {
    dashboard: {
      Endpoint: "/dashboard",
      Method: HttpMethod.Post,
    }
  },
};

export default ApiRoutes;
