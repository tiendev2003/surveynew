import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useContext } from "react";
import Layout from "./component/layout";
import LoginLayout from "./component/layout/LoginLayout";
import { AuthContext } from "./context/AuthContext";
import Account from "./pages/accounts";
import DanhSachChuDe from "./pages/chudekhaosat/DanhSachChuDe";
import ConfirmPassword from "./pages/confirm-password";
import CreateAccount from "./pages/create-account";
import ChinhSuaCauhoi from "./pages/danhsachcauhoi/ChinhSuaCauhoi";
import DanhSachCauhoi from "./pages/danhsachcauhoi/DanhSachCauhoi";
import TaoCauhoi from "./pages/danhsachcauhoi/TaoCauhoi";
import DanhSachKhaoSat from "./pages/danhsachkhaosat/DanhSachKhaoSat";
import SuaKhaoSat from "./pages/danhsachkhaosat/SuaKhaoSat";
import TaoKhaoSat from "./pages/danhsachkhaosat/TaoKhaoSat";
import DetailSurvey from "./pages/detail-survey";
import Error from "./pages/error";
import ForgetPassword from "./pages/forget-password";
import DanhSachKhoa from "./pages/khoa/DanhSachKhoa";
import SuaKhoa from "./pages/khoa/SuaKhoa";
import TaoKhoa from "./pages/khoa/TaoKhoa";
import Login from "./pages/login";
import DanhSachLopHoc from "./pages/lophoc/DanhSachLopHoc";
import SuaLopHoc from "./pages/lophoc/SuaLopHoc";
import TaoLopHoc from "./pages/lophoc/TaoLopHoc";
import PasswordSuccess from "./pages/password-success";
import PendingSurveys from "./pages/pending-surveys";
import Profile from "./pages/profile";
import Statistics from "./pages/statistics";
import SurveyList from "./pages/survey-list";
import Verification from "./pages/verification";
import TaoChuDe from "./pages/chudekhaosat/TaoChuDe";
import ChinhSuaChuDe from "./pages/chudekhaosat/ChinhSuaChuDe";

function Router() {
  const { isAuthenticated, userRole, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route index path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/password-success" element={<PasswordSuccess />} />
        </Route>
        {isAuthenticated ? (
          userRole === "admin" ? (
            <Route path="/admin" element={<Layout />}>
              <Route path="" element={<PendingSurveys />} />
              <Route path="department" element={<DanhSachKhoa />} />
              <Route path="department/create" element={<TaoKhoa />} />
              <Route path="department/edit/:id" element={<SuaKhoa />} />
              <Route path="classes" element={<DanhSachLopHoc />} />
              <Route path="classes/create" element={<TaoLopHoc />} />
              <Route path="classes/edit/:id" element={<SuaLopHoc />} />
              <Route path="pending-surveys" element={<PendingSurveys />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="profile" element={<Profile />} />
              <Route path="accounts" element={<Account />} />
            </Route>
          ) : userRole === "student" ? (
            <Route path="/student" element={<Layout />}>
              <Route path="survey-list" element={<SurveyList />} />
              <Route path="survey-list/:id" element={<DetailSurvey />} />
              <Route path="" element={<SurveyList />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          ) : userRole === "lecturer" ? (
            <Route path="/lecturer" element={<Layout />}>
              <Route path="" element={<DanhSachKhaoSat />} />
              <Route path="manage-surveys" element={<DanhSachKhaoSat />} />
              <Route path="manage-surveys/create" element={<TaoKhaoSat />} />
              <Route path="manage-surveys/edit/:id" element={<SuaKhaoSat />} />
              <Route path="manage-questions" element={<DanhSachCauhoi />} />
              <Route path="manage-questions/create" element={<TaoCauhoi />} />
              <Route
                path="manage-questions/edit/:id"
                element={<ChinhSuaCauhoi />}
              />
              <Route path="manage-typed" element={<DanhSachChuDe />} />
              <Route path="manage-typed/create" element={<TaoChuDe />} />
              <Route path="manage-typed/edit/:id" element={<ChinhSuaChuDe />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
