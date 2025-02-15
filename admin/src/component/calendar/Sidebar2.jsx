import React from "react";
import TaskProcess from "./TaskProcess";
import SelectInput from "../form/SelectInput";
import toggleIcon from "../../assets/img/toggle-icon2.svg";
import { Link } from "react-router-dom";

function Sidebar2() {
  return (
    <div className="col-xxl-4 col-xl-12 col-12 mg-top-30">
      <TaskProcess />

      {/* <!-- Upcoming Events --> */}
      <div className="crancy-single__box mg-top-30">
        <div className="crancy-sidebar__heading">
          <h3 className="crancy-sidebar__title m-0">Upcoming Events</h3>
          {/* <SelectInput
            options={["Last 7 Days", "Last 15 Days", "Last 30 Days"]}
          /> */}
        </div>

        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="recent_email_t1"
            role="tabpanel"
            aria-labelledby="crancy-chart__t4"
          >
            {/* <!-- Chatbox List --> */}
            <ul className="crancy-chatbox__list crancy-chatbox__list--v3">
              {/* <!-- Single List --> */}
              <li>
                <div className="crancy-chatbox__inner">
                  <div className="crancy-chatbox__author crancy-chatbox__email">
                    <div className="crancy-chatbox__author-img">
                      <svg
                        width="23"
                        height="25"
                        viewBox="0 0 23 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.9346 21.7757C14.218 23.9968 13.0393 25.0158 11.2334 24.9998C9.47864 24.9838 8.30099 23.9393 7.62911 21.7757C6.03194 21.7757 4.42305 21.7852 2.81416 21.7725C1.43421 21.7618 0.273592 20.7875 0.0457288 19.4789C-0.246022 17.8019 0.885842 16.3261 2.65338 16.1472C3.1123 16.1004 3.21878 15.9257 3.21772 15.5094C3.21346 13.7845 3.13892 12.0531 3.26457 10.3367C3.50521 7.03479 5.25145 4.7487 8.26372 3.4124C8.32335 3.38578 8.38298 3.36129 8.44154 3.33361C8.47029 3.31976 8.49585 3.29953 8.52247 3.28143C8.65556 1.10821 9.64155 -0.0353689 11.3516 0.000833726C12.9977 0.0349068 13.972 1.22853 14.0263 3.21648C14.7451 3.6573 15.484 4.01826 16.1154 4.51445C18.2578 6.19681 19.3162 8.43711 19.3471 11.1576C19.363 12.5898 19.3641 14.0219 19.3417 15.454C19.3343 15.9098 19.4429 16.1014 19.9487 16.1536C21.5256 16.3176 22.6745 17.6432 22.5659 19.0849C22.4456 20.6842 21.253 21.7703 19.6037 21.7735C18.0438 21.7778 16.4838 21.7757 14.9346 21.7757ZM11.2281 20.1572C13.9113 20.1572 16.5935 20.1572 19.2768 20.1572C19.4557 20.1572 19.6356 20.1614 19.8134 20.1455C20.4832 20.088 20.9389 19.6141 20.9485 18.9731C20.957 18.3737 20.5087 17.8626 19.888 17.7689C19.7762 17.7518 19.6612 17.754 19.5483 17.7412C18.4292 17.6092 17.736 16.8393 17.7286 15.7043C17.7211 14.533 17.7371 13.3617 17.7233 12.1915C17.7147 11.4611 17.7296 10.7232 17.6274 10.0034C17.16 6.726 14.136 4.22163 10.9661 4.44737C7.42893 4.69972 4.85535 7.41386 4.83725 10.9181C4.8298 12.3981 4.83619 13.8782 4.83619 15.3582C4.83619 16.9532 4.29847 17.5655 2.72898 17.7635C2.15826 17.836 1.69721 18.2555 1.62267 18.7719C1.54281 19.3235 1.84415 19.8825 2.36589 20.0603C2.60547 20.1412 2.87592 20.1529 3.13253 20.154C5.82963 20.1593 8.52885 20.1572 11.2281 20.1572ZM9.35726 21.798C9.53401 22.7723 10.3912 23.4282 11.3921 23.3728C12.328 23.3207 13.1138 22.6296 13.1798 21.798C11.9074 21.798 10.6339 21.798 9.35726 21.798ZM12.4068 2.85871C12.4238 2.31674 12.2141 1.9398 11.7583 1.73004C11.3239 1.52986 10.8937 1.58204 10.5328 1.9036C10.2474 2.15808 10.0856 2.47645 10.1835 2.85871C10.9342 2.85871 11.6433 2.85871 12.4068 2.85871Z"
                          fill="#0A82FD"
                        />
                      </svg>
                    </div>
                    <div className="crancy-chatbox__author-content">
                      <h4 className="crancy-chatbox__author-title">
                        <Link to="#">Team Meeting With USA Client</Link>
                      </h4>
                      <p className="crancy-chatbox__time crancy-chatbox__message">
                        17 October , 06:59PM
                      </p>
                    </div>
                  </div>
                  <div className="crancy-chatbox__right crancy-chatbox__right__message">
                    <div className="crancy-chatbox__toggle">
                      <Link to="#">
                        <img src={toggleIcon} alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              {/* <!-- End Single List --> */}
              {/* <!-- Single List --> */}
              <li>
                <div className="crancy-chatbox__inner">
                  <div className="crancy-chatbox__author crancy-chatbox__email">
                    <div className="crancy-chatbox__author-img">
                      <svg
                        className="crancy-color8__opacity--bg crancy-color2__fill"
                        width="23"
                        height="25"
                        viewBox="0 0 23 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.9346 21.7757C14.218 23.9968 13.0393 25.0158 11.2334 24.9998C9.47864 24.9838 8.30099 23.9393 7.62911 21.7757C6.03194 21.7757 4.42305 21.7852 2.81416 21.7725C1.43421 21.7618 0.273592 20.7875 0.0457288 19.4789C-0.246022 17.8019 0.885842 16.3261 2.65338 16.1472C3.1123 16.1004 3.21878 15.9257 3.21772 15.5094C3.21346 13.7845 3.13892 12.0531 3.26457 10.3367C3.50521 7.03479 5.25145 4.7487 8.26372 3.4124C8.32335 3.38578 8.38298 3.36129 8.44154 3.33361C8.47029 3.31976 8.49585 3.29953 8.52247 3.28143C8.65556 1.10821 9.64155 -0.0353689 11.3516 0.000833726C12.9977 0.0349068 13.972 1.22853 14.0263 3.21648C14.7451 3.6573 15.484 4.01826 16.1154 4.51445C18.2578 6.19681 19.3162 8.43711 19.3471 11.1576C19.363 12.5898 19.3641 14.0219 19.3417 15.454C19.3343 15.9098 19.4429 16.1014 19.9487 16.1536C21.5256 16.3176 22.6745 17.6432 22.5659 19.0849C22.4456 20.6842 21.253 21.7703 19.6037 21.7735C18.0438 21.7778 16.4838 21.7757 14.9346 21.7757ZM11.2281 20.1572C13.9113 20.1572 16.5935 20.1572 19.2768 20.1572C19.4557 20.1572 19.6356 20.1614 19.8134 20.1455C20.4832 20.088 20.9389 19.6141 20.9485 18.9731C20.957 18.3737 20.5087 17.8626 19.888 17.7689C19.7762 17.7518 19.6612 17.754 19.5483 17.7412C18.4292 17.6092 17.736 16.8393 17.7286 15.7043C17.7211 14.533 17.7371 13.3617 17.7233 12.1915C17.7147 11.4611 17.7296 10.7232 17.6274 10.0034C17.16 6.726 14.136 4.22163 10.9661 4.44737C7.42893 4.69972 4.85535 7.41386 4.83725 10.9181C4.8298 12.3981 4.83619 13.8782 4.83619 15.3582C4.83619 16.9532 4.29847 17.5655 2.72898 17.7635C2.15826 17.836 1.69721 18.2555 1.62267 18.7719C1.54281 19.3235 1.84415 19.8825 2.36589 20.0603C2.60547 20.1412 2.87592 20.1529 3.13253 20.154C5.82963 20.1593 8.52885 20.1572 11.2281 20.1572ZM9.35726 21.798C9.53401 22.7723 10.3912 23.4282 11.3921 23.3728C12.328 23.3207 13.1138 22.6296 13.1798 21.798C11.9074 21.798 10.6339 21.798 9.35726 21.798ZM12.4068 2.85871C12.4238 2.31674 12.2141 1.9398 11.7583 1.73004C11.3239 1.52986 10.8937 1.58204 10.5328 1.9036C10.2474 2.15808 10.0856 2.47645 10.1835 2.85871C10.9342 2.85871 11.6433 2.85871 12.4068 2.85871Z"
                          fill="#EF5DA8"
                        />
                      </svg>
                    </div>
                    <div className="crancy-chatbox__author-content">
                      <h4 className="crancy-chatbox__author-title">
                        <Link to="#">Team Meeting With USA Client</Link>
                      </h4>
                      <p className="crancy-chatbox__time crancy-chatbox__message">
                        17 October , 06:59PM
                      </p>
                    </div>
                  </div>
                  <div className="crancy-chatbox__right crancy-chatbox__right__message">
                    <div className="crancy-chatbox__toggle">
                      <Link to="#">
                        <img src={toggleIcon} alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              {/* <!-- End Single List --> */}
              {/* <!-- Single List --> */}
              <li>
                <div className="crancy-chatbox__inner">
                  <div className="crancy-chatbox__author crancy-chatbox__email">
                    <div className="crancy-chatbox__author-img">
                      <svg
                        className="crancy-color6__opacity--bg"
                        width="23"
                        height="25"
                        viewBox="0 0 23 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.9346 21.7757C14.218 23.9968 13.0393 25.0158 11.2334 24.9998C9.47864 24.9838 8.30099 23.9393 7.62911 21.7757C6.03194 21.7757 4.42305 21.7852 2.81416 21.7725C1.43421 21.7618 0.273592 20.7875 0.0457288 19.4789C-0.246022 17.8019 0.885842 16.3261 2.65338 16.1472C3.1123 16.1004 3.21878 15.9257 3.21772 15.5094C3.21346 13.7845 3.13892 12.0531 3.26457 10.3367C3.50521 7.03479 5.25145 4.7487 8.26372 3.4124C8.32335 3.38578 8.38298 3.36129 8.44154 3.33361C8.47029 3.31976 8.49585 3.29953 8.52247 3.28143C8.65556 1.10821 9.64155 -0.0353689 11.3516 0.000833726C12.9977 0.0349068 13.972 1.22853 14.0263 3.21648C14.7451 3.6573 15.484 4.01826 16.1154 4.51445C18.2578 6.19681 19.3162 8.43711 19.3471 11.1576C19.363 12.5898 19.3641 14.0219 19.3417 15.454C19.3343 15.9098 19.4429 16.1014 19.9487 16.1536C21.5256 16.3176 22.6745 17.6432 22.5659 19.0849C22.4456 20.6842 21.253 21.7703 19.6037 21.7735C18.0438 21.7778 16.4838 21.7757 14.9346 21.7757ZM11.2281 20.1572C13.9113 20.1572 16.5935 20.1572 19.2768 20.1572C19.4557 20.1572 19.6356 20.1614 19.8134 20.1455C20.4832 20.088 20.9389 19.6141 20.9485 18.9731C20.957 18.3737 20.5087 17.8626 19.888 17.7689C19.7762 17.7518 19.6612 17.754 19.5483 17.7412C18.4292 17.6092 17.736 16.8393 17.7286 15.7043C17.7211 14.533 17.7371 13.3617 17.7233 12.1915C17.7147 11.4611 17.7296 10.7232 17.6274 10.0034C17.16 6.726 14.136 4.22163 10.9661 4.44737C7.42893 4.69972 4.85535 7.41386 4.83725 10.9181C4.8298 12.3981 4.83619 13.8782 4.83619 15.3582C4.83619 16.9532 4.29847 17.5655 2.72898 17.7635C2.15826 17.836 1.69721 18.2555 1.62267 18.7719C1.54281 19.3235 1.84415 19.8825 2.36589 20.0603C2.60547 20.1412 2.87592 20.1529 3.13253 20.154C5.82963 20.1593 8.52885 20.1572 11.2281 20.1572ZM9.35726 21.798C9.53401 22.7723 10.3912 23.4282 11.3921 23.3728C12.328 23.3207 13.1138 22.6296 13.1798 21.798C11.9074 21.798 10.6339 21.798 9.35726 21.798ZM12.4068 2.85871C12.4238 2.31674 12.2141 1.9398 11.7583 1.73004C11.3239 1.52986 10.8937 1.58204 10.5328 1.9036C10.2474 2.15808 10.0856 2.47645 10.1835 2.85871C10.9342 2.85871 11.6433 2.85871 12.4068 2.85871Z"
                          fill="#F2994A"
                        />
                      </svg>
                    </div>
                    <div className="crancy-chatbox__author-content">
                      <h4 className="crancy-chatbox__author-title">
                        <Link to="#">Team Meeting With USA Client</Link>
                      </h4>
                      <p className="crancy-chatbox__time crancy-chatbox__message">
                        17 October , 06:59PM
                      </p>
                    </div>
                  </div>
                  <div className="crancy-chatbox__right crancy-chatbox__right__message">
                    <div className="crancy-chatbox__toggle">
                      <Link to="#">
                        <img src={toggleIcon} alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              {/* <!-- End Single List --> */}
              {/* <!-- Single List --> */}
              <li>
                <div className="crancy-chatbox__inner">
                  <div className="crancy-chatbox__author crancy-chatbox__email">
                    <div className="crancy-chatbox__author-img">
                      <svg
                        className="crancy-color9__opacity--bg"
                        width="23"
                        height="25"
                        viewBox="0 0 23 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.9346 21.7757C14.218 23.9968 13.0393 25.0158 11.2334 24.9998C9.47864 24.9838 8.30099 23.9393 7.62911 21.7757C6.03194 21.7757 4.42305 21.7852 2.81416 21.7725C1.43421 21.7618 0.273592 20.7875 0.0457288 19.4789C-0.246022 17.8019 0.885842 16.3261 2.65338 16.1472C3.1123 16.1004 3.21878 15.9257 3.21772 15.5094C3.21346 13.7845 3.13892 12.0531 3.26457 10.3367C3.50521 7.03479 5.25145 4.7487 8.26372 3.4124C8.32335 3.38578 8.38298 3.36129 8.44154 3.33361C8.47029 3.31976 8.49585 3.29953 8.52247 3.28143C8.65556 1.10821 9.64155 -0.0353689 11.3516 0.000833726C12.9977 0.0349068 13.972 1.22853 14.0263 3.21648C14.7451 3.6573 15.484 4.01826 16.1154 4.51445C18.2578 6.19681 19.3162 8.43711 19.3471 11.1576C19.363 12.5898 19.3641 14.0219 19.3417 15.454C19.3343 15.9098 19.4429 16.1014 19.9487 16.1536C21.5256 16.3176 22.6745 17.6432 22.5659 19.0849C22.4456 20.6842 21.253 21.7703 19.6037 21.7735C18.0438 21.7778 16.4838 21.7757 14.9346 21.7757ZM11.2281 20.1572C13.9113 20.1572 16.5935 20.1572 19.2768 20.1572C19.4557 20.1572 19.6356 20.1614 19.8134 20.1455C20.4832 20.088 20.9389 19.6141 20.9485 18.9731C20.957 18.3737 20.5087 17.8626 19.888 17.7689C19.7762 17.7518 19.6612 17.754 19.5483 17.7412C18.4292 17.6092 17.736 16.8393 17.7286 15.7043C17.7211 14.533 17.7371 13.3617 17.7233 12.1915C17.7147 11.4611 17.7296 10.7232 17.6274 10.0034C17.16 6.726 14.136 4.22163 10.9661 4.44737C7.42893 4.69972 4.85535 7.41386 4.83725 10.9181C4.8298 12.3981 4.83619 13.8782 4.83619 15.3582C4.83619 16.9532 4.29847 17.5655 2.72898 17.7635C2.15826 17.836 1.69721 18.2555 1.62267 18.7719C1.54281 19.3235 1.84415 19.8825 2.36589 20.0603C2.60547 20.1412 2.87592 20.1529 3.13253 20.154C5.82963 20.1593 8.52885 20.1572 11.2281 20.1572ZM9.35726 21.798C9.53401 22.7723 10.3912 23.4282 11.3921 23.3728C12.328 23.3207 13.1138 22.6296 13.1798 21.798C11.9074 21.798 10.6339 21.798 9.35726 21.798ZM12.4068 2.85871C12.4238 2.31674 12.2141 1.9398 11.7583 1.73004C11.3239 1.52986 10.8937 1.58204 10.5328 1.9036C10.2474 2.15808 10.0856 2.47645 10.1835 2.85871C10.9342 2.85871 11.6433 2.85871 12.4068 2.85871Z"
                          fill="#27AE60"
                        />
                      </svg>
                    </div>
                    <div className="crancy-chatbox__author-content">
                      <h4 className="crancy-chatbox__author-title">
                        <Link to="#">Team Meeting With USA Client</Link>
                      </h4>
                      <p className="crancy-chatbox__time crancy-chatbox__message">
                        17 October , 06:59PM
                      </p>
                    </div>
                  </div>
                  <div className="crancy-chatbox__right crancy-chatbox__right__message">
                    <div className="crancy-chatbox__toggle">
                      <Link to="#">
                        <img src={toggleIcon} alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              {/* <!-- End Single List --> */}
              {/* <!-- Single List --> */}
              <li>
                <div className="crancy-chatbox__inner">
                  <div className="crancy-chatbox__author crancy-chatbox__email">
                    <div className="crancy-chatbox__author-img">
                      <svg
                        width="23"
                        height="25"
                        viewBox="0 0 23 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.9346 21.7757C14.218 23.9968 13.0393 25.0158 11.2334 24.9998C9.47864 24.9838 8.30099 23.9393 7.62911 21.7757C6.03194 21.7757 4.42305 21.7852 2.81416 21.7725C1.43421 21.7618 0.273592 20.7875 0.0457288 19.4789C-0.246022 17.8019 0.885842 16.3261 2.65338 16.1472C3.1123 16.1004 3.21878 15.9257 3.21772 15.5094C3.21346 13.7845 3.13892 12.0531 3.26457 10.3367C3.50521 7.03479 5.25145 4.7487 8.26372 3.4124C8.32335 3.38578 8.38298 3.36129 8.44154 3.33361C8.47029 3.31976 8.49585 3.29953 8.52247 3.28143C8.65556 1.10821 9.64155 -0.0353689 11.3516 0.000833726C12.9977 0.0349068 13.972 1.22853 14.0263 3.21648C14.7451 3.6573 15.484 4.01826 16.1154 4.51445C18.2578 6.19681 19.3162 8.43711 19.3471 11.1576C19.363 12.5898 19.3641 14.0219 19.3417 15.454C19.3343 15.9098 19.4429 16.1014 19.9487 16.1536C21.5256 16.3176 22.6745 17.6432 22.5659 19.0849C22.4456 20.6842 21.253 21.7703 19.6037 21.7735C18.0438 21.7778 16.4838 21.7757 14.9346 21.7757ZM11.2281 20.1572C13.9113 20.1572 16.5935 20.1572 19.2768 20.1572C19.4557 20.1572 19.6356 20.1614 19.8134 20.1455C20.4832 20.088 20.9389 19.6141 20.9485 18.9731C20.957 18.3737 20.5087 17.8626 19.888 17.7689C19.7762 17.7518 19.6612 17.754 19.5483 17.7412C18.4292 17.6092 17.736 16.8393 17.7286 15.7043C17.7211 14.533 17.7371 13.3617 17.7233 12.1915C17.7147 11.4611 17.7296 10.7232 17.6274 10.0034C17.16 6.726 14.136 4.22163 10.9661 4.44737C7.42893 4.69972 4.85535 7.41386 4.83725 10.9181C4.8298 12.3981 4.83619 13.8782 4.83619 15.3582C4.83619 16.9532 4.29847 17.5655 2.72898 17.7635C2.15826 17.836 1.69721 18.2555 1.62267 18.7719C1.54281 19.3235 1.84415 19.8825 2.36589 20.0603C2.60547 20.1412 2.87592 20.1529 3.13253 20.154C5.82963 20.1593 8.52885 20.1572 11.2281 20.1572ZM9.35726 21.798C9.53401 22.7723 10.3912 23.4282 11.3921 23.3728C12.328 23.3207 13.1138 22.6296 13.1798 21.798C11.9074 21.798 10.6339 21.798 9.35726 21.798ZM12.4068 2.85871C12.4238 2.31674 12.2141 1.9398 11.7583 1.73004C11.3239 1.52986 10.8937 1.58204 10.5328 1.9036C10.2474 2.15808 10.0856 2.47645 10.1835 2.85871C10.9342 2.85871 11.6433 2.85871 12.4068 2.85871Z"
                          fill="#0A82FD"
                        />
                      </svg>
                    </div>
                    <div className="crancy-chatbox__author-content">
                      <h4 className="crancy-chatbox__author-title">
                        <Link to="#">Team Meeting With USA Client</Link>
                      </h4>
                      <p className="crancy-chatbox__time crancy-chatbox__message">
                        17 October , 06:59PM
                      </p>
                    </div>
                  </div>
                  <div className="crancy-chatbox__right crancy-chatbox__right__message">
                    <div className="crancy-chatbox__toggle">
                      <Link to="#">
                        <img src={toggleIcon} alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              {/* <!-- End Single List --> */}
            </ul>
          </div>
        </div>
        <div className="crancy-see__all">
          <Link to="#">
            See All{" "}
            <svg
              width="6"
              height="11"
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.31067 5.12982C3.22077 4.09604 2.15567 3.08694 1.09058 2.07715C0.823994 1.82419 0.55369 1.57671 0.292686 1.31758C-0.0278346 0.998126 -0.0637925 0.579951 0.189772 0.256381C0.441477 -0.0644482 0.829574 -0.0918694 1.15505 0.215249C2.67892 1.65212 4.20093 3.09242 5.71798 4.53821C6.09244 4.89469 6.0943 5.36428 5.7217 5.7187C4.18791 7.17819 2.64916 8.63152 1.10856 10.0814C0.788656 10.3824 0.39126 10.3419 0.147615 10.0101C-0.0885909 9.68792 -0.0389939 9.25192 0.279667 8.9496C1.47 7.81916 2.66342 6.69215 3.85561 5.56308C4.00254 5.4246 4.14885 5.28407 4.31067 5.12982Z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar2;
