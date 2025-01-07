import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../component/email/Wrapper";
import Layout from "../component/home/Layout";
import {
  fetchSurvey,
  saveSurveyResponses,
} from "../features/khaosat/khaosatSlice";
import useMenu from "../hooks/useMenu";
const questionTypeTranslation = {
  rating: "Đánh giá",
  text: "Văn bản",
  multiple_choice: "Lựa chọn nhiều",
};

const optionLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];

const DetailSurvey = () => {
  useMenu();
  const [responses, setResponses] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const [khaosat, setKhaosat] = useState({});
  useEffect(() => {
    setLoading(true);
    dispatch(fetchSurvey(id))
      .unwrap()
      .then((data) => {
        console.log(data.data);
        setKhaosat(data.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Có lỗi xảy ra khi tải dữ liệu khảo sát.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, id]);

  useEffect(() => {
    if (khaosat.questions) {
      const initialResponses = {};
      khaosat.questions.forEach((question) => {
        if (question.user_response) {
          initialResponses[question.id] = question.user_response;
        }
      });
      setResponses(initialResponses);
    }
  }, [khaosat]);

  const handleChange = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Bạn có chắc chắn muốn gửi kết quả khảo sát?")) {
      setLoading(true);
      const formattedResponses = Object.keys(responses).map((questionId) => ({
        question_id: questionId,
        answer_text: responses[questionId],
      }));
      try {
        await dispatch(
          saveSurveyResponses({ surveyId: id, responses: formattedResponses })
        ).unwrap();
        setLoading(false);
        toast.success("Gửi kết quả khảo sát thành công.");
        history("/student/survey-list");
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error("Có lỗi xảy ra khi gửi kết quả khảo sát.");
      }
    }
  };
  return (
    <Layout>
      <Wrapper>
        <div className="container">
          {loading ? (
            <div className="alert alert-info" role="alert">
              Đang gửi kết quả khảo sát...
            </div>
          ) : Object.keys(khaosat).length === 0 ? (
            <div className="alert alert-warning" role="alert">
              Không có dữ liệu khảo sát.
            </div>
          ) : (
            <>
              <div className="row mb-4">
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{khaosat.title}</h5>
                      <p className="card-text">{khaosat.description}</p>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <strong>Ngày bắt đầu:</strong>{" "}
                          {new Date(khaosat.start_date).toLocaleDateString()}
                        </li>
                        <li className="list-group-item">
                          <strong>Ngày kết thúc:</strong>{" "}
                          {new Date(khaosat.end_date).toLocaleDateString()}
                        </li>
                        <li className="list-group-item">
                          <strong>Trạng thái:</strong> {khaosat.status}
                        </li>
                        <li className="list-group-item">
                          <strong>Đã duyệt:</strong>{" "}
                          {khaosat.is_approved ? "Có" : "Không"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {khaosat?.questions?.map((question) => (
                    <div className="col-md-12 mb-4" key={question.id}>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">
                            {question.question_text}
                          </h5>
                          <p className="card-text">
                            Loại:{" "}
                            {questionTypeTranslation[question.question_type]}
                          </p>
                          {question.question_type === "multiple_choice" && (
                            <ul className="list-group list-group-flush">
                              {question.options.map((option, index) => (
                                <li className="list-group-item" key={option.id}>
                                  <div
                                    className="crancy-wc__checkbox"
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <label
                                      htmlFor={`question_${question.id}_${option.id}`}
                                      style={{
                                        marginBottom: 0,
                                      }}
                                    >
                                      {optionLabels[index]}.{" "}
                                      {option.option_text}
                                    </label>
                                    <input
                                      className="crancy-wc__form-check"
                                      id={`question_${question.id}_${option.id}`}
                                      name={`question_${question.id}`}
                                      onChange={() =>
                                        handleChange(question.id, option.option_text)
                                      }
                                      type="radio"
                                      checked={
                                        responses[question.id] == option.option_text
                                      }
                                    />
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                          {question.question_type === "text" && (
                            <div className="crancy-main-form__group mg-top-30">
                              <textarea
                                className="crancy-main-form__input"
                                type="text"
                                name="message"
                                onChange={(e) =>
                                  handleChange(question.id, e.target.value)
                                }
                                placeholder="Tin nhắn"
                                 value={responses[question.id] || ""}
                              ></textarea>
                            </div>
                          )}
                          {question.question_type === "rating" && (
                            <div
                              className="mt-2 "
                              style={{
                                userSelect: "none",
                                display: "flex",
                                gap: "10px",
                                justifyContent: "space-between",
                              }}
                            >
                              {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                  key={value}
                                  className={`rating-icon ${
                                    responses[question.id] === value
                                      ? "selected"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleChange(question.id, value)
                                  }
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "24px",
                                    backgroundColor:
                                      responses[question.id] == value
                                        ? "rgb(66 161 255)"
                                        : "white",
                                    padding: "5px",
                                    borderRadius: "50px",
                                  }}
                                >
                                  {value === 1 && "😢"}
                                  {value === 2 && "😟"}
                                  {value === 3 && "😐"}
                                  {value === 4 && "😊"}
                                  {value === 5 && "😁"}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  Gửi
                </button>
              </form>
            </>
          )}
        </div>
      </Wrapper>
    </Layout>
  );
};

export default DetailSurvey;
