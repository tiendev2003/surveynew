import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../../component/email/Wrapper';
import Layout from '../../component/home/Layout';
import { deleteKhoa, fetchKhoas } from '../../features/khoa/khoaSlice';
import useMenu from '../../hooks/useMenu';

const DanhSachKhoa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { khoas, status, error } = useSelector((state) => state.khoas);
  const [currentPage, setCurrentPage] = useState(1);
  const [khoasPerPage, setKhoasPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchKhoas());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteKhoa(id))
      .then(() => {
        toast.success("Department deleted successfully");
      })
      .catch(() => {
        toast.error("Failed to delete department");
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastKhoa = currentPage * khoasPerPage;
  const indexOfFirstKhoa = indexOfLastKhoa - khoasPerPage;
  const currentKhoas = khoas.slice(indexOfFirstKhoa, indexOfLastKhoa);

  useMenu();

  return (
    <Layout>
      <Wrapper>
        <div className="container-fluid p-0">
          <div className="crancy-table crancy-table__support mg-top-30">
            <div className="crancy-table__heading">
              <h3 className="crancy-table__title mb-0">Danh sách khoa</h3>
              <div className="crancy-table__right">
                <Link
                  to={"/admin/department/create"}
                  className="crancy-btn crancy-sbcolor crancy-btn__profile"
                >
                  Thêm khoa
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
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="crancy-table__body">
                    {currentKhoas.map((khoa) => (
                      <tr key={khoa.id}>
                        <td className="crancy-table__column-1 crancy-table__data-1">
                          {khoa.id}
                        </td>
                        <td className="crancy-table__column-2 crancy-table__data-2">
                          {khoa.name}
                        </td>
                        <td className="crancy-table__column-3 crancy-table__data-3">
                          <button
                            style={{ height: "30px", width: "30px" }}
                            onClick={() =>
                              navigate(`/admin/department/edit/${khoa.id}`)
                            }
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            style={{ height: "30px", width: "30px" }}
                            onClick={() => handleDelete(khoa.id)}
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
                          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
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
                          Array(Math.ceil(khoas.length / khoasPerPage)).keys()
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
                            currentPage === Math.ceil(khoas.length / khoasPerPage)
                              ? "disabled"
                              : ""
                          }`}
                          id="crancy-table__main_next"
                          onClick={() =>
                            currentPage < Math.ceil(khoas.length / khoasPerPage) &&
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
};

export default DanhSachKhoa;