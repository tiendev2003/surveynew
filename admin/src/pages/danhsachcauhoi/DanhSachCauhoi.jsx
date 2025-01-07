import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../component/email/Wrapper";
import Layout from "../../component/home/Layout";
import {
  deleteQuestion,
  fetchQuestions,
} from "../../features/cauhoi/cauhoiSlice";
import useMenu from "../../hooks/useMenu";

const DanhSachCauhoi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cauhois, status, error } = useSelector((state) => state.cauhoi);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteQuestion(id)).unwrap();
   
      toast.success("Xóa câu hỏi thành công");
    } catch (error) {
      console.log(error);
      toast.error("Xóa câu hỏi thất bại");
    }finally{
      await dispatch(fetchQuestions()).unwrap();
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = cauhois.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  useMenu();

  return (
    <Layout>
      <Wrapper>
        <div className="container-fluid p-0">
          <div className="crancy-table crancy-table__support mg-top-30">
            <div className="crancy-table__heading">
              <h3 className="crancy-table__title mb-0">Danh sách câu hỏi</h3>
              <div className="crancy-table__right">
                <Link
                  to={"/lecturer/manage-questions/create"}
                  className="crancy-btn crancy-sbcolor crancy-btn__profile"
                >
                  Thêm câu hỏi
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
                        Text
                      </th>
                      <th className="crancy-table__column-3 crancy-table__h3">
                        Type
                      </th>
                      <th className="crancy-table__column-4 crancy-table__h4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="crancy-table__body">
                    {currentQuestions.map((question,index) => (
                      <tr key={question.id}>
                        <td className="crancy-table__column-1 crancy-table__data-1">
                          {index+1}
                        </td>
                        <td className="crancy-table__column-2 crancy-table__data-2">
                          {question.question_text}
                        </td>
                        <td className="crancy-table__column-3 crancy-table__data-3">
                          {question.question_type}
                        </td>
                        <td className="crancy-table__column-4 crancy-table__data-4">
                          <button
                            style={{ height: "30px", width: "30px" }}
                            onClick={() =>
                              navigate(
                                `/lecturer/manage-questions/edit/${question.id}`
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            style={{ height: "30px", width: "30px" }}
                            onClick={() => handleDelete(question.id)}
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
                          Array(
                            Math.ceil(cauhois.length / questionsPerPage)
                          ).keys()
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
                            Math.ceil(cauhois.length / questionsPerPage)
                              ? "disabled"
                              : ""
                          }`}
                          id="crancy-table__main_next"
                          onClick={() =>
                            currentPage <
                              Math.ceil(cauhois.length / questionsPerPage) &&
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

export default DanhSachCauhoi;
