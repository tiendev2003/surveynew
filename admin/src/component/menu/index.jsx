import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import logo from "../../assets/img/logo-dark.png";
import { useContext } from "react";
import arrowIcon from "../../assets/img/arrow-icon.svg";
import logoIcon from "../../assets/img/logo-icon.png";
import logoWhite from "../../assets/img/logo-white.png";
import logo from "../../assets/img/logo.png";
import { AuthContext } from "../../context/AuthContext";

function Menu({ toggleMenu, menu }) {
  const { userRole } = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();
  const handleDropdown = (name) => {
    setDropdown(name === dropdown ? "" : name);
  };
  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };
  return (
    <div className={`crancy-smenu ${menu && "crancy-close"}`} id="CrancyMenu">
      {/* <!-- Admin Menu --> */}
      <div className={`admin-menu ${dropdown ? "no-overflow" : ""}`}>
        {/* <!-- Logo --> */}
        <div className="logo crancy-sidebar-padding pd-right-0">
          <Link className="crancy-logo" to="/">
            {/* <!-- Logo for Default --> */}
            <img className="crancy-logo__main" src={logo} alt="#" />
            <img className="crancy-logo__main--dark" src={logoWhite} alt="#" />
            {/* <!-- Logo for Dark Version --> */}
            <img className="crancy-logo__main--small" src={logoIcon} alt="#" />
            <img
              className="crancy-logo__main--small--dark"
              src={logoIcon}
              alt="#"
            />
          </Link>
          <div
            id="crancy__sicon"
            className="crancy__sicon close-icon"
            onClick={toggleMenu}
          >
            <img src={arrowIcon} />
          </div>
        </div>

        {/* <!-- Main Menu --> */}
        <div className="admin-menu__one crancy-sidebar-padding mg-top-20">
          <h4 className="admin-menu__title">Menu</h4>
          {/* <!-- Nav Menu 왼쪽 사이드 --> */}
          <div className="menu-bar">
            <ul id="CrancyMenu" className="menu-bar__one crancy-dashboard-menu">
              {userRole === "student" && (
                <>
                  <li className={activeMenu === "survey-list" ? "active" : ""}>
                    <Link
                      className="collapsed"
                      to="/student/survey-list"
                      onClick={() => handleMenuClick("survey-list")}
                    >
                      <span className="menu-bar__text">
                        <span className="crancy-menu-icon crancy-svg-icon__v1">
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-10v2h14V7H7z"/>
                          </svg>
                        </span>
                        <span className="menu-bar__name">Survey List</span>
                      </span>
                    </Link>
                  </li>
                  <li className={activeMenu === "profile" ? "active" : ""}>
                    <Link
                      className="collapsed"
                      to="/student/profile"
                      onClick={() => handleMenuClick("profile")}
                    >
                      <span className="menu-bar__text">
                        <span className="crancy-menu-icon crancy-svg-icon__v1">
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </span>
                        <span className="menu-bar__name">Profile</span>
                      </span>
                    </Link>
                  </li>
                </>
              )}
              {userRole === "lecturer" && (
                <>
                  <li className={activeMenu === "survey-crud" ? "active" : ""}>
                    <Link
                      className="collapsed"
                      to="/lecturer/manage-surveys"
                      onClick={() => handleMenuClick("survey-crud")}
                    >
                      <span className="menu-bar__text">
                        <span className="crancy-menu-icon crancy-svg-icon__v1">
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-10v2h14V7H7z"/>
                          </svg>
                        </span>
                        <span className="menu-bar__name">Manage Surveys</span>
                      </span>
                    </Link>
                  </li>
                  <li className={activeMenu === "cauhoi" ? "active" : ""}>
                    <Link
                      className="collapsed"
                      to="/lecturer/manage-questions"
                      onClick={() => handleMenuClick("cauhoi")}
                    >
                      <span className="menu-bar__text">
                        <span className="crancy-menu-icon crancy-svg-icon__v1">
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-10v2h14V7H7z"/>
                          </svg>
                        </span>
                        <span className="menu-bar__name">Ngân hàng câu hỏi</span>
                      </span>
                    </Link>
                  </li>
                  <li className={activeMenu === "chude" ? "active" : ""}>
                    <Link
                      className="collapsed"
                      to="/lecturer/manage-typed"
                      onClick={() => handleMenuClick("chude")}
                    >
                      <span className="menu-bar__text">
                        <span className="crancy-menu-icon crancy-svg-icon__v1">
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-10v2h14V7H7z"/>
                          </svg>
                        </span>
                        <span className="menu-bar__name">Chủ đề khảo sát</span>
                      </span>
                    </Link>
                  </li>
                  <li className={activeMenu === "profile" ? "active" : ""}>
                    <Link
                      className="collapsed"
                      to="/lecturer/profile"
                      onClick={() => handleMenuClick("profile")}
                    >
                      <span className="menu-bar__text">
                        <span className="crancy-menu-icon crancy-svg-icon__v1">
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </span>
                        <span className="menu-bar__name">Profile</span>
                      </span>
                    </Link>
                  </li>
                </>
              )}
              {userRole === "admin" && (
                <>
                  <li className={activeMenu === "pending-surveys" ? "active" : ""}>
                    <Link
                      className="collapsed"
                      to="/admin/pending-surveys"
                      onClick={() => handleMenuClick("pending-surveys")}
                    >
                      <span className="menu-bar__text">
                        <span className="crancy-menu-icon crancy-svg-icon__v1">
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-10v2h14V7H7z"/>
                          </svg>
                        </span>
                        <span className="menu-bar__name">Pending Surveys</span>
                      </span>
                    </Link>
                  </li>
                  <li className={activeMenu === "department" ? "active" : ""}>
                    <Link
                      className="collapsed"
                      to="/admin/department"
                      onClick={() => handleMenuClick("department")}
                    >
                      <span className="menu-bar__text">
                        <span className="crancy-menu-icon crancy-svg-icon__v1">
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-10v2h14V7H7z"/>
                          </svg>
                        </span>
                        <span className="menu-bar__name">Danh sách khoa</span>
                      </span>
                    </Link>
                  </li>
                  <li className={activeMenu === "classes" ? "active" : ""}>
                    <Link
                      className="collapsed"
                      to="/admin/classes"
                      onClick={() => handleMenuClick("classes")}
                    >
                      <span className="menu-bar__text">
                        <span className="crancy-menu-icon crancy-svg-icon__v1">
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-10v2h14V7H7z"/>
                          </svg>
                        </span>
                        <span className="menu-bar__name">Danh sách lớp</span>
                      </span>
                    </Link>
                  </li>
                  <li className={activeMenu === "statistics" ? "active" : ""}>
                    <Link
                      className="collapsed"
                      to="/admin/accounts"
                      onClick={() => handleMenuClick("accounts")}
                    >
                      <span className="menu-bar__text">
                        <span className="crancy-menu-icon crancy-svg-icon__v1">
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </span>
                        <span className="menu-bar__name">Tài khoản</span>
                      </span>
                    </Link>
                  </li>
                  <li className={activeMenu === "statistics" ? "active" : ""}>
                    <Link
                      className="collapsed"
                      to="/admin/statistics"
                      onClick={() => handleMenuClick("statistics")}
                    >
                      <span className="menu-bar__text">
                        <span className="crancy-menu-icon crancy-svg-icon__v1">
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </span>
                        <span className="menu-bar__name">Thống kê</span>
                      </span>
                    </Link>
                  </li>
                  <li className={activeMenu === "profile" ? "active" : ""}>
                    <Link
                      className="collapsed"
                      to="/admin/profile"
                      onClick={() => handleMenuClick("profile")}
                    >
                      <span className="menu-bar__text">
                        <span className="crancy-menu-icon crancy-svg-icon__v1">
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </span>
                        <span className="menu-bar__name">Profile</span>
                      </span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* <!-- End Nav Menu --> */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
