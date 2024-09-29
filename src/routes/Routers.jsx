import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from './ProtectedRoute.jsx'
import Setting from "../pages/setting/Index";
import Calendar from "../pages/calendar/Index";
import Dashbord from "../pages/dashboard/Index";
import Digital from "../pages/admin/Index";
import Coupens from "../pages/coupon/Index.jsx";
import Admin from "../pages/admin/Index.jsx";
import Services from "../pages/manage-services/Index.jsx";
import ServiesRegister from "../pages/manage-services/ServicesRegister.jsx";
import ServiceCategory from "../pages/manage-services/Category.jsx";
import ServiceCategoryRegister from "../pages/manage-services/CategoryRegister.jsx";
import Barn from "../pages/barn/Index.jsx";
import Users from "../pages/users/Index.jsx";
import MangeStaffs from "../pages/manage-staffs/Index.jsx";
import MangeRole from "../pages/manage-staffs/Role.jsx";
import Permissions from "../pages/manage-staffs/Permissions.jsx";
import Products from "../pages/manage-products/Index.jsx";
import ProductCategory from "../pages/manage-products/Category.jsx";
import ProductSubCategory from "../pages/manage-products/ProductSubCategory.jsx";
import ProductRegister from "../pages/manage-products/ProductRegister.jsx";
import ProductCategoryRegister from "../pages/manage-products/CategoryRegister.jsx";
import ProductSubCategoryRegister from "../pages/manage-products/SubCategoryRegister";
import BarnRegister from "../pages/barn/Step.jsx";
import AdminRegister from "../pages/admin/Register.jsx";
import UsersRegister from "../pages/users/Register.jsx";
import StaffRegister from "../pages/manage-staffs/Register.jsx";
import CampingAds from "../pages/camping/ad/Index.jsx";
import CampingAdsRegister from "../pages/camping/ad/Register.jsx";
import CampingEmail from "../pages/camping/email/Index.jsx";
import CampingEmailRegister from "../pages/camping/email/Register.jsx";
import MainChat from "../pages/chat/Index.jsx";

import { Toaster } from "react-hot-toast";

const Routers = () => {
  return (
    <React.Suspense>
      <Toaster
        position="bottom-left"
      //  reverseOrder={false}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Login />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashbord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coupons"
          element={
            <ProtectedRoute>
              <Coupens />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/digital"
          element={
            <ProtectedRoute>
              <Digital />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/register"
          element={
            <ProtectedRoute>
              <AdminRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-services/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-services/category"
          element={
            <ProtectedRoute>
              <ServiceCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-services/category/register"
          element={
            <ProtectedRoute>
              <ServiceCategoryRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-services/services/register"
          element={
            <ProtectedRoute>
              <ServiesRegister />
            </ProtectedRoute>
          }
        />
        {/* productsRoute */}
        <Route
          path="/manage-products/produts"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-products/product/register"
          element={
            <ProtectedRoute>
              <ProductRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="manage-products/category"
          element={
            <ProtectedRoute>
              <ProductCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="manage-products/sub-category"
          element={
            <ProtectedRoute>
              <ProductSubCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="manage-products/sub-category/register"
          element={
            <ProtectedRoute>
              <ProductSubCategoryRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-products/category/register"
          element={
            <ProtectedRoute>
              <ProductCategoryRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barns"
          element={
            <ProtectedRoute>
              <Barn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barns/register"
          element={
            <ProtectedRoute>
              <BarnRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/register"
          element={
            <ProtectedRoute>
              <UsersRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-staffs/staff"
          element={
            <ProtectedRoute>
              <MangeStaffs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-staffs/roles"
          element={
            <ProtectedRoute>
              <MangeRole />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-staffs/permissions"
          element={
            <ProtectedRoute>
              <Permissions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-staffs/staff/register"
          element={
            <ProtectedRoute>
              <StaffRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/camping/ads"
          element={
            <ProtectedRoute>
              <CampingAds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/camping/ads/register"
          element={
            <ProtectedRoute>
              <CampingAdsRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/camping/email"
          element={
            <ProtectedRoute>
              <CampingEmail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/camping/email/register"
          element={
            <ProtectedRoute>
              <CampingEmailRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <MainChat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </React.Suspense>

  );
};

export default Routers;
