import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: [],
  user: [],
  product: [],
  productCategory:[],
  productSubCategory:[],
};

export const tableSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    adminTable: (state, action) => {
      state.admin = action.payload;
    },
    userTable: (state, action) => {
      state.user = action.payload;
    },
    productsTable: (state, action) => {
      console.log(action.payload);
      state.product = action.payload;
    },
    productsCatagoryTable: (state, action) => {
      state.productCategory = action.payload;
    },
    productsSubCatagoryTable: (state, action) => {
      state.productSubCategory = action.payload;
    },
  },
});

export const { adminTable,userTable,productsTable,productsCatagoryTable,productsSubCatagoryTable } = tableSlice.actions;

export default tableSlice.reducer;
