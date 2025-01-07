import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import axiosClient from "../api/axiosClient";
import Wrapper from "../component/email/Wrapper";
import Layout from "../component/home/Layout";
import { fetchUsers } from "../features/user/userSlice";
import useMenu from "../hooks/useMenu";

 
function Account() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const { users, status, error } = useSelector((state) => state.users);
  useMenu();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      try {
        await axiosClient.post('/api/users/bulk', { users: worksheet });
        dispatch(fetchUsers());
        toast.success("Users uploaded successfully");
      } catch (error) {
        toast.error("Failed to upload users");
        console.error("Failed to upload users", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <Wrapper>
        <div className="container-fluid p-0">
          <div className="crancy-table crancy-table__support mg-top-30">
            <div className="crancy-table__heading">
              <h3 className="crancy-table__title mb-0">Danh sách sinh viên</h3>
              <div className="crancy-table__right">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <button className="crancy-btn crancy-sbcolor" onClick={handleIconClick}>
                  <FontAwesomeIcon icon={faFileUpload} /> Nhập từ Excel
                </button>
                <button className="crancy-btn crancy-sbcolor" onClick={handleUpload}>
                  Thêm
                </button>
                {file && <span className="file-name">{file.name}</span>}
              </div>
            </div>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="table_1"
                role="tabpanel"
                aria-labelledby="table_1"
              >
                <table
                  id="crancy-table__main"
                  className="crancy-table__main crancy-table__ticket"
                >
                  <thead className="crancy-table__head">
                    <tr>
                      <th className="crancy-table__column-1 crancy-table__h1">
                        ID
                      </th>
                      <th className="crancy-table__column-2 crancy-table__h2">
                        Username
                      </th>
                      <th className="crancy-table__column-3 crancy-table__h3">
                        Email{" "}
                      </th>
                   
                    </tr>
                  </thead>
                  <tbody className="crancy-table__body">
                    {" "}
                    {currentUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="crancy-table__column-1 crancy-table__data-1">
                          {user.id}
                        </td>
                        <td className="crancy-table__column-2 crancy-table__data-2">
                          {user.username}
                        </td>
                        <td className="crancy-table__column-3 crancy-table__data-3">
                          {user.email}
                        </td>
                         
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="crancy-table-bottom">
                  <div
                    id="crancy-table__main_filter"
                    className="dataTables_filter"
                  >
                    <label>
                      Search:
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder=""
                        aria-controls="crancy-table__main"
                      />
                    </label>
                  </div>
                  <div
                    className="dataTables_length"
                    id="crancy-table__main_length"
                  >
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="crancy-table__main_paginate"
                    >
                      <ul className="pagination">
                        <li
                          className={`paginate_button page-item previous ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                          id="crancy-table__main_previous"
                          onClick={() =>
                            currentPage > 1 && setCurrentPage(currentPage - 1)
                          }
                        >
                          <a
                            aria-controls="crancy-table__main"
                            data-dt-idx="previous"
                            tabIndex="0"
                            className="page-link"
                          >
                            <i className="fas fa-angle-left"></i>
                          </a>
                        </li>
                        {Array.from(
                          Array(Math.ceil(users.length / usersPerPage)).keys()
                        ).map((id, index) => (
                          <li
                            className={`paginate_button page-item ${
                              currentPage === index + 1 ? "active" : ""
                            }`}
                            onClick={() => setCurrentPage(index + 1)}
                            key={index + "key"}
                          >
                            <a
                              aria-controls="crancy-table__main"
                              data-dt-idx="0"
                              tabIndex="0"
                              className="page-link"
                            >
                              {index + 1}
                            </a>
                          </li>
                        ))}
                        <li
                          className={`paginate_button page-item next ${
                            currentPage ===
                            Math.ceil(users.length / usersPerPage)
                              ? "disabled"
                              : ""
                          }`}
                          id="crancy-table__main_next"
                          onClick={() =>
                            currentPage <
                              Math.ceil(users.length / usersPerPage) &&
                            setCurrentPage(currentPage + 1)
                          }
                        >
                          <a
                            aria-controls="crancy-table__main"
                            data-dt-idx="next"
                            tabIndex="0"
                            className="page-link"
                          >
                            <i className="fas fa-angle-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
}

export default Account;
