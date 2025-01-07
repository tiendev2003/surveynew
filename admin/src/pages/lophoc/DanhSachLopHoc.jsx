import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../component/email/Wrapper";
import Layout from "../../component/home/Layout";
import { deleteClass, fetchClasses } from "../../features/lophoc/lophocSlice";
import useMenu from "../../hooks/useMenu";

const DanhSachLopHoc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [classesPerPage, setClassesPerPage] = useState(10);
  const [lophocs, setLophocs] = useState([]);
  useEffect(() => {
    dispatch(fetchClasses())
      .then((response) => {
        setLophocs(response.payload.data);
      })
      .catch(() => {
        toast.error("Failed to fetch classes");
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteClass(id))
      .then(() => {
        toast.success("Class deleted successfully");
        setLophocs(lophocs.filter((lophoc) => lophoc.id !== id));
      })
      .catch(() => {
        toast.error("Failed to delete class");
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = lophocs.slice(indexOfFirstClass, indexOfLastClass);
  console.log(lophocs);
  useMenu();

  return (
    <Layout>
      <Wrapper>
        <div className="container-fluid p-0">
          <div className="crancy-table crancy-table__support mg-top-30">
            <div className="crancy-table__heading">
              <h3 className="crancy-table__title mb-0">Danh sách lớp học</h3>
              <div className="crancy-table__right">
                <Link
                  to={"/admin/classes/create"}
                  className="crancy-btn crancy-sbcolor crancy-btn__profile"
                >
                  Thêm lớp học
                </Link>
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
                        Name
                      </th>
                      <th className="crancy-table__column-3 crancy-table__h3">
                        Khoa
                      </th>
                      <th className="crancy-table__column-4 crancy-table__h4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="crancy-table__body">
                    {currentClasses.map((lophoc, index) => (
                      <tr key={index}>
                        <td className="crancy-table__column-1 crancy-table__data-1">
                          {lophoc.id}
                        </td>
                        <td className="crancy-table__column-2 crancy-table__data-2">
                          {lophoc.name}
                        </td>
                        <td className="crancy-table__column-3 crancy-table__data-3">
                          {lophoc.department.name}
                        </td>
                        <td className="crancy-table__column-4 crancy-table__data-4">
                          <button
                            style={{ height: "30px", width: "30px" }}
                            onClick={() =>
                              navigate(`/admin/classes/edit/${lophoc.id}`)
                            }
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            style={{ height: "30px", width: "30px" }}
                            onClick={() => handleDelete(lophoc.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
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
                            currentPage > 1 && handlePageChange(currentPage - 1)
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
                          Array(
                            Math.ceil(lophocs.length / classesPerPage)
                          ).keys()
                        ).map((id, index) => (
                          <li
                            className={`paginate_button page-item ${
                              currentPage === index + 1 ? "active" : ""
                            }`}
                            onClick={() => handlePageChange(index + 1)}
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
                            Math.ceil(lophocs.length / classesPerPage)
                              ? "disabled"
                              : ""
                          }`}
                          id="crancy-table__main_next"
                          onClick={() =>
                            currentPage <
                              Math.ceil(lophocs.length / classesPerPage) &&
                            handlePageChange(currentPage + 1)
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
};

export default DanhSachLopHoc;
