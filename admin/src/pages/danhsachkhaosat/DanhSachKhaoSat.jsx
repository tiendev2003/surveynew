import {
  faClone,
  faCopy,
  faEdit,
  faEnvelope,
  faTrash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import Wrapper from "../../component/email/Wrapper";
import Layout from "../../component/home/Layout";
import {
  copySurvey,
  createSurveyLink,
  deleteSurvey,
  fetchSurveys,
  sendSurvey,
} from "../../features/khaosat/khaosatSlice";
import { fetchKhoas } from "../../features/khoa/khoaSlice";
import { fetchLophocs } from "../../features/lop/lophocSlice";
import { fetchUsers } from "../../features/user/userSlice";
import useMenu from "../../hooks/useMenu";

const DanhSachKhaoSat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { khaosats, status, error } = useSelector((state) => state.khaosat);
  const [currentPage, setCurrentPage] = useState(1);
  const [surveysPerPage, setSurveysPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const { khoas } = useSelector((state) => state.khoas);
  const { lophocs } = useSelector((state) => state.lophocs);
  const { users } = useSelector((state) => state.users);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(25);
  const [page, setPage] = useState(1);
  const [confirmSendAll, setConfirmSendAll] = useState(false);

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteSurvey(id))
      .then(() => {
        toast.success("Survey deleted successfully");
      })
      .catch(() => {
        toast.error("Failed to delete survey");
      });
  };

  useEffect(() => {
    dispatch(fetchKhoas(123));
    dispatch(fetchLophocs(123));
    dispatch(fetchUsers(123));
  }, [dispatch]);

  const handleCopy = async (id) => {
    try {
      await dispatch(copySurvey(id)).unwrap();
      toast.success("Survey copied successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy survey");
    }
  };

  const handleShareSurveyLink = async (id) => {
    try {
      const res = await dispatch(createSurveyLink(id)).unwrap();
      navigator.clipboard.writeText(res.data.link);
      toast.success("Đã sao chép link khảo sát");
    } catch (error) {
      console.log(error);
      toast.error("Failed to share survey link");
    }
  };

  const handleSendSurveyToGroups = async (id) => {
    console.log(id);
    setSelectedSurvey(id);
    setShowModal(true);
  };

  const handleSendSurveyToAllStudents = async (id) => {
    setIsLoading(true);
    try {
      await dispatch(
        sendSurvey({
          id,
          type: "all_students",
        })
      ).unwrap();
      toast.success("Survey sent to all students successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.error || "Failed to send survey to all students");
    } finally {
      setIsLoading(false);
      setConfirmSendAll(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = async () => {
    setIsLoading(true);
    console.log(selectedClass);
    if (selectedOption === "department") {
      try {
        await dispatch(
          sendSurvey({
            id: selectedSurvey,
            type: "department",
            ids: selectedDepartment.value,
          })
        ).unwrap();
        toast.success("Survey sent successfully");
      } catch (error) {
        console.log(error);
        toast.error("Failed to send survey");
      }
    } else if (selectedOption === "class") {
      try {
        await dispatch(
          sendSurvey({
            id: selectedSurvey,
            type: "class",
            ids: selectedClass.value,
          })
        ).unwrap();
        toast.success("Survey sent successfully");
      } catch (error) {
        console.log(error);
        toast.error("Failed to send survey");
      }
    }
    setIsLoading(false);
    setShowModal(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const departmentOptions = khoas.map((dept) => ({
    value: dept.id,
    label: dept.name,
  }));
  console.log(lophocs);
  const classOptions = lophocs.map((cls) => ({
    value: cls.id,
    label: cls.name,
  }));
  const emailOptions = users.map((user) => ({
    value: user.id,
    label: user.email,
  }));

  const indexOfLastSurvey = currentPage * surveysPerPage;
  const indexOfFirstSurvey = indexOfLastSurvey - surveysPerPage;
  const currentSurveys = khaosats.slice(indexOfFirstSurvey, indexOfLastSurvey);

  useMenu();
  return (
    <Layout>
      <Wrapper>
        <div className="container-fluid p-0">
          <div className="crancy-table crancy-table__support mg-top-30">
            <div className="crancy-table__heading">
              <h3 className="crancy-table__title mb-0">Danh sách khảo sát</h3>
              <div className="crancy-table__right">
                <Link
                  to={"/lecturer/manage-surveys/create"}
                  className="crancy-btn crancy-sbcolor crancy-btn__profile"
                >
                  Thêm khảo sát
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
                        Title
                      </th>
                      <th className="crancy-table__column-3 crancy-table__h3">
                        Description
                      </th>
                      <th className="crancy-table__column-4 crancy-table__h4">
                        Start Date
                      </th>
                      <th className="crancy-table__column-5 crancy-table__h5">
                        End Date
                      </th>
                      <th className="crancy-table__column-6 crancy-table__h6">
                        Status
                      </th>
                      <th className="crancy-table__column-7 crancy-table__h7">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="crancy-table__body">
                    {currentSurveys.map((survey) => {
                      const isPastEndDate =
                        new Date(survey.end_date) < new Date();
                      return (
                        <tr key={survey.id}>
                          <td className="crancy-table__column-1 crancy-table__data-1">
                            {survey.id}
                          </td>
                          <td className="crancy-table__column-2 crancy-table__data-2">
                            {survey.title}
                          </td>
                          <td className="crancy-table__column-3 crancy-table__data-3">
                            {survey.description}
                          </td>
                          <td className="crancy-table__column-4 crancy-table__data-4">
                            {new Date(survey.start_date).toLocaleDateString()}
                          </td>
                          <td className="crancy-table__column-5 crancy-table__data-5">
                            {new Date(survey.end_date).toLocaleDateString()}
                          </td>
                          <td className="crancy-table__column-6 crancy-table__data-6">
                            <span
                              className={`badge ${
                                survey.status === "draft"
                                  ? "bg-secondary"
                                  : survey.status === "active"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {survey.status}
                            </span>
                          </td>
                          <td className="crancy-table__column-7 crancy-table__data-7">
                            <button
                              style={{ height: "30px", width: "30px" }}
                              onClick={() =>
                                navigate(`/lecturer/manage-surveys/edit/${survey.id}`)
                              }
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              style={{ height: "30px", width: "30px" }}
                              onClick={() => handleCopy(survey.id)}
                            >
                              <FontAwesomeIcon icon={faCopy} />
                            </button>
                            <button
                              style={{ height: "30px", width: "30px" }}
                              onClick={() => handleDelete(survey.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button
                              style={{ height: "30px", width: "30px" }}
                              onClick={() =>
                                handleSendSurveyToGroups(survey.id)
                              }
                            >
                              <FontAwesomeIcon icon={faEnvelope} />
                            </button>
                            <button
                              style={{ height: "30px", width: "30px" }}
                              onClick={() => handleShareSurveyLink(survey.id)}
                            >
                              <FontAwesomeIcon icon={faClone} />
                            </button>
                            <button
                              style={{ height: "30px", width: "30px" }}
                              onClick={() => {
                                setSelectedSurvey(survey.id);
                                setConfirmSendAll(true);
                              }}
                              disabled={isLoading}
                            >
                              <FontAwesomeIcon icon={faUsers} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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
                            page === 1 ? "disabled" : ""
                          }`}
                          id="crancy-table__main_previous"
                          onClick={() => page > 1 && setPage(page - 1)}
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
                          Array(Math.ceil(khaosats.length / show)).keys("n")
                        ).map((id, index) => (
                          <li
                            className={`paginate_button page-item ${
                              page === index + 1 ? "active" : ""
                            }`}
                            onClick={() => setPage(index + 1)}
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
                            page === khaosats.length % show < 1
                              ? "disabled"
                              : ""
                          }`}
                          id="crancy-table__main_next"
                          onClick={() =>
                            page < Math.ceil(khaosats.length / show) &&
                            setPage(page + 1)
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
                  <div className="dataTables_paginate">
                    {[
                      ...Array(
                        Math.ceil(khaosats.length / surveysPerPage)
                      ).keys(),
                    ].map((number) => (
                      <button
                        key={number + 1}
                        onClick={() => handlePageChange(number + 1)}
                      >
                        {number + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <div className="modal show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Send Survey</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleModalClose}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    {/* Removed the date selection field */}
                    <div className="mb-3">
                      <label htmlFor="formSelect" className="form-label">
                        Select Option
                      </label>
                      <select
                        className="form-select"
                        id="formSelect"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="department">Department</option>
                        <option value="class">Class</option>
                      </select>
                    </div>
                    {selectedOption === "department" && (
                      <div className="mb-3">
                        <label htmlFor="formDepartment" className="form-label">
                          Department
                        </label>
                        <Select
                          id="formDepartment"
                          options={departmentOptions}
                          value={selectedDepartment}
                          onChange={setSelectedDepartment}
                        />
                      </div>
                    )}
                    {selectedOption === "class" && (
                      <div className="mb-3">
                        <label htmlFor="formClass" className="form-label">
                          Class
                        </label>
                        <Select
                          id="formClass"
                          options={classOptions}
                          value={selectedClass}
                          onChange={setSelectedClass}
                        />
                      </div>
                    )}
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleModalClose}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleModalSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {confirmSendAll && (
          <div className="modal show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Send to All Students</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setConfirmSendAll(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to send this survey to all students?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setConfirmSendAll(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleSendSurveyToAllStudents(selectedSurvey)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </Wrapper>
    </Layout>
  );
};

export default DanhSachKhaoSat;
