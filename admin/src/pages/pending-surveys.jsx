import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Wrapper from "../component/email/Wrapper";
import Layout from "../component/home/Layout";
import {
  approveSurvey,
  fetchSurveysPending,
} from "../features/khaosat/khaosatSlice";
import useMenu from "../hooks/useMenu";

function PendingSurveys() {
  const { khaosats, status, error } = useSelector((state) => state.khaosat);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(25);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchSurveysPending());
  }, [dispatch]);

  const handleApprove = async (id) => {
    setLoading(true);
    try {
      await dispatch(approveSurvey(id)).unwrap();
      toast.success("Survey approved successfully!");
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useMenu();
  return (
    <Layout>
      <Wrapper>
        {loading && <div className="loading-spinner">Loading...</div>}
        <div className="  col-12 crancy-main__column">
          <div className="crancy-body">
            <div className="crancy-dsinner">
              <div className="crancy-table crancy-table--v3 mg-top-30">
                <table
                  id="crancy-table__main"
                  className="crancy-table__main crancy-table__main-v3"
                >
                  {/* <!-- crancy Table Head --> */}
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
                     
                      <th className="crancy-table__column-7 crancy-table__h7">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {/* <!-- crancy Table Body --> */}
                  <tbody className="crancy-table__body">
                    {khaosats?.map((survey, index) => (
                      <tr key={index}>
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
                        
                        <td className="crancy-table__column-7 crancy-table__data-7">
                          <button
                            onClick={() => handleApprove(survey.id)}
                            disabled={survey.is_approved}
                            className="btn btn-success"
                          >
                            {survey.is_approved ? "Approved" : "Approve"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* <!-- End crancy Table --> */}
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
                    style={{ display: "flex" }}
                  >
                    <label
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <span> Show result: </span>
                      <select
                        name="crancy-table__main_length"
                        aria-controls="crancy-table__main"
                        className="form-select form-select-sm"
                        defaultValue={25}
                        onChange={(e) => setShow(e.target.value)}
                      >
                        <option value="4">4</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                      </select>
                    </label>
                  </div>
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
                          page === khaosats.length % show < 1 ? "disabled" : ""
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
                {/* pagination end  */}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
}

export default PendingSurveys;
