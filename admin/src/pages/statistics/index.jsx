import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { FaFileExport } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../component/email/Wrapper";
import Layout from "../../component/home/Layout";
import { fetchSurveyAllAdmin, fetchSurveyStatis } from "../../features/khaosat/khaosatSlice";
import useMenu from "../../hooks/useMenu";
import "./index.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { khaosats, status, error, thongke } = useSelector((state) => state.khaosat);
  const [currentPage, setCurrentPage] = useState(1);
  const [surveysPerPage, setSurveysPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);
  const chart3Ref = useRef(null);
  const chart4Ref = useRef(null);
  
  useEffect(() => {
    dispatch(fetchSurveyAllAdmin());
  }, [dispatch]);
console.log(thongke)
  const classData = {
    labels: thongke?.classStats?.map((stat) => stat.Class.name) || [],
    datasets: [
      {
        label: "Số lượng phản hồi",
        data: thongke?.classStats?.map((stat) => stat.response_count) || [],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const departmentData = {
    labels: thongke?.departmentStats?.map((stat) => stat?.Department?.name) || [],
    datasets: [
      {
        label: "Số lượng phản hồi",
        data: thongke?.departmentStats?.map((stat) => stat?.response_count) || [],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const questionData = {
    labels: thongke?.questionStats?.map((stat) => stat.Question.question_text) || [],
    datasets: [
      {
        label: "Số lượng phản hồi",
        data: thongke?.questionStats?.map((stat) => stat.response_count) || [],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const optionData = {
    labels: thongke?.optionStats?.map((stat) => stat.answer_text) || [],
    datasets: [
      {
        label: "Số lượng phản hồi",
        data: thongke?.optionStats?.map((stat) => stat.response_count) || [],
        backgroundColor: ["rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const classOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Số lượng phản hồi",
        },
      },
      x: {
        title: {
          display: true,
          text: "Các lớp",
        },
      },
    },
  };

  const departmentOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Số lượng phản hồi",
        },
      },
      x: {
        title: {
          display: true,
          text: "Khoa",
        },
      },
    },
  };

  const questionOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Số lượng phản hồi",
        },
      },
      x: {
        title: {
          display: true,
          text: "Câu hỏi",
        },
      },
    },
  };

  const optionOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Số lượng phản hồi",
        },
      },
      x: {
        title: {
          display: true,
          text: "Câu trả lời",
        },
      },
    },
  };

  const indexOfLastSurvey = currentPage * surveysPerPage;
  const indexOfFirstSurvey = indexOfLastSurvey - surveysPerPage;
  const currentSurveys = khaosats.slice(indexOfFirstSurvey, indexOfLastSurvey);

  const handleSurveyClick = (survey) => {
    setSelectedSurvey(survey);
    console.log(survey);
    dispatch(fetchSurveyStatis(survey.id));
  };

  const csvData = khaosats.map((survey) => ({
    ID: survey.id,
    Title: survey.title,
    Description: survey.description,
    "Start Date": new Date(survey.start_date).toLocaleDateString(),
    "End Date": new Date(survey.end_date).toLocaleDateString(),
  }));

  const exportChartAsImage = (chartRef, filename) => {
    const chart = chartRef.current;
    if (chart) {
      const url = chart.toBase64Image();
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
    }
  };

  const exportChartsAsPDF = () => {
    const doc = new jsPDF();
    const chart1 = chart1Ref.current;
    const chart2 = chart2Ref.current;
    const chart3 = chart3Ref.current;
    const chart4 = chart4Ref.current;

    if (chart1 && chart2 && chart3 && chart4) {
      const chart1Image = chart1.toBase64Image();
      const chart2Image = chart2.toBase64Image();
      const chart3Image = chart3.toBase64Image();
      const chart4Image = chart4.toBase64Image();

      doc.text("Class Chart", 10, 10);
      doc.addImage(chart1Image, "PNG", 10, 20, 180, 80);
      doc.addPage();
      doc.text("Department Chart", 10, 10);
      doc.addImage(chart2Image, "PNG", 10, 20, 180, 80);
      doc.addPage();
      doc.text("Question Chart", 10, 10);
      doc.addImage(chart3Image, "PNG", 10, 20, 180, 80);
      doc.addPage();
      doc.text("Option Chart", 10, 10);
      doc.addImage(chart4Image, "PNG", 10, 20, 180, 80);

      doc.save("charts.pdf");
    }
  };

  useMenu();
  return (
    <Layout>
      <Wrapper>
        <div className="container-fluid p-0">
          <div className="crancy-table crancy-table__support mg-top-30">
            <div className="crancy-table__heading">
              <h3 className="crancy-table__title mb-0">Danh sách khảo sát</h3>
              {/* <button onClick={exportChartsAsPDF} className="btn btn-primary">
                <FaFileExport /> Export Charts as PDF
              </button> */}
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
                        Export
                      </th>
                    </tr>
                  </thead>
                  <tbody className="crancy-table__body">
                    {currentSurveys.map((survey) => {
                      const isPastEndDate =
                        new Date(survey.end_date) < new Date();
                      return (
                        <tr
                          key={survey.id}
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => handleSurveyClick(survey)}
                        >
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
                            <button onClick={exportChartsAsPDF} className="btn btn-secondary">
                              <FaFileExport />
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
                            Math.ceil(khaosats.length / surveysPerPage)
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
                            Math.ceil(khaosats.length / surveysPerPage)
                              ? "disabled"
                              : ""
                          }`}
                          id="crancy-table__main_next"
                          onClick={() =>
                            currentPage <
                              Math.ceil(khaosats.length / surveysPerPage) &&
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
          {selectedSurvey && (
            <div className="charts-container">
              <Bar ref={chart1Ref} data={classData} options={classOptions} />
              <Bar ref={chart2Ref} data={departmentData} options={departmentOptions} />
              <Bar ref={chart3Ref} data={questionData} options={questionOptions} />
              <Bar ref={chart4Ref} data={optionData} options={optionOptions} />
            </div>
          )}
        </div>
      </Wrapper>
    </Layout>
  );
};

export default Statistics;
