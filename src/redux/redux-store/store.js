import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux-slice/user.slice";
import tableDataSlice from "../redux-slice/tableData.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tableDataSlice: tableDataSlice,
  },

});
