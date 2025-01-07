import {
  faCheck,
  faEdit,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "../../component/email/Wrapper";
import Layout from "../../component/home/Layout";
import { fetchQuestionsByExam, } from "../../features/cauhoi/cauhoiSlice";
import { fetchTopics } from "../../features/chude/chudeSlice";
import { fetchSurvey, updateSurvey } from "../../features/khaosat/khaosatSlice";
import useMenu from "../../hooks/useMenu";

const SuaKhaoSat = () => {
  useMenu();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { cauhois } = useSelector((state) => state.cauhoi);
  const { chudes } = useSelector((state) => state.chude);
  const { khaosat, status } = useSelector((state) => state.khaosat);
  const [surveyData, setSurveyData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    questions: [],
    question_ids: [],
    survey_type_id: "",
  });

  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "text",
    options: [],
  });

  const [newOption, setNewOption] = useState("");
  const [editingOptionIndex, setEditingOptionIndex] = useState(null);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = cauhois.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchTopics());
    dispatch(fetchSurvey(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (surveyData.survey_type_id) {
      dispatch(fetchQuestionsByExam(surveyData.survey_type_id));
    }
  }, [dispatch, surveyData.survey_type_id]);

  useEffect(() => {
    if (khaosat && khaosat.id) {
      console.log(khaosat);
      // chuyển "2024-11-28T00:00:00.000Z" thành "2024-11-28"

      setSurveyData({
        ...surveyData,
        title: khaosat.title,
        description: khaosat.description,
        start_date: khaosat.start_date.split("T")[0],
        end_date: khaosat.end_date.split("T")[0],
        question_ids: khaosat.questions.map((question) => question.id),
        survey_type_id: khaosat.survey_type_id,
      });
    }
  }, [khaosat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurveyData({ ...surveyData, [name]: value });
  };

  const handleQuestionSelection = (id) => {
    const updatedQuestionIds = surveyData.question_ids.includes(id)
      ? surveyData.question_ids.filter((qid) => qid !== id)
      : [...surveyData.question_ids, id];
    setSurveyData({ ...surveyData, question_ids: updatedQuestionIds });
  };

  const handleNewQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const handleAddOption = () => {
    if (!newOption.trim()) {
      alert("Option text cannot be empty.");
      return;
    }

    if (newQuestion.options.length >= 4 && editingOptionIndex === null) {
      alert("You can only add up to 4 options.");
      return;
    }

    if (editingOptionIndex !== null) {
      const updatedOptions = [...newQuestion.options];
      updatedOptions[editingOptionIndex] = newOption;
      setNewQuestion({ ...newQuestion, options: updatedOptions });
      setEditingOptionIndex(null);
    } else {
      setNewQuestion({
        ...newQuestion,
        options: [...newQuestion.options, newOption],
      });
    }

    setNewOption("");
  };

  const handleEditOption = (index) => {
    setNewOption(newQuestion.options[index]);
    setEditingOptionIndex(index);
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = newQuestion.options.filter((_, i) => i !== index);
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const handleAddQuestion = () => {
    if (!newQuestion.text.trim()) {
      alert("Question text is required!");
      return;
    }

    const updatedQuestions = [...surveyData.questions];
    if (editingQuestionIndex !== null) {
      updatedQuestions[editingQuestionIndex] = newQuestion;
    } else {
      updatedQuestions.push(newQuestion);
    }

    setSurveyData({ ...surveyData, questions: updatedQuestions });

    setNewQuestion({ text: "", type: "text", options: [] });
    setEditingQuestionIndex(null);
  };

  const handleEditQuestion = (index) => {
    setNewQuestion(surveyData.questions[index]);
    setEditingQuestionIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = surveyData.questions.filter((_, i) => i !== index);
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(surveyData);
    try {
      await dispatch(updateSurvey({ id, ...surveyData })).unwrap();
      toast.success("Survey updated successfully!");
      navigate("/lecturer/manage-surveys");
    } catch (error) {
      console.error("Error updating survey:", error);
      toast.error("Failed to update survey.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <h1 className="mb-4">Sửa Khảo Sát</h1>
              <div className="crancy-main-form">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <div className="crancy-main-form__inner">
                        {/* Loading Spinner */}
                        {loading && (
                          <div className="loading-spinner">
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="crancy-main-form__group crancy-main-form__group--rmargin">
                              <input
                                className="crancy-main-form__input"
                                type="text"
                                name="title"
                                placeholder="Tiêu Đề Khảo Sát"
                                value={surveyData.title}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="crancy-main-form__group">
                              <textarea
                                className="crancy-main-form__textarea"
                                name="description"
                                placeholder="Mô Tả"
                                value={surveyData.description}
                                onChange={handleChange}
                                rows="3"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="crancy-main-form__group crancy-main-form__group--rmargin">
                              <input
                                className="crancy-main-form__input"
                                type="date"
                                name="start_date"
                                placeholder="Ngày Bắt Đầu"
                                value={surveyData.start_date}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="crancy-main-form__group">
                              <input
                                className="crancy-main-form__input"
                                type="date"
                                name="end_date"
                                placeholder="Ngày Kết Thúc"
                                value={surveyData.end_date}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="crancy-main-form__group crancy-main-form__group--rmargin">
                              <select
                                className="form-select"
                                name="survey_type_id"
                                value={surveyData.survey_type_id}
                                onChange={handleChange}
                              >
                                <option value="">Chọn Loại Khảo Sát</option>
                                {chudes.map((chude) => (
                                  <option key={chude.id} value={chude.id}>
                                    {chude.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className=" ">
                          <h4>Câu Hỏi Có Sẵn</h4>
                          <ul className="list-group">
                            {currentQuestions.map((q) => (
                              <li key={q.id} className="list-group-item">
                                <div className="crancy-wc__checkbox">
                                  <input
                                    className="crancy-wc__form-check"
                                    id={`question-${q.id}`}
                                    name="checkbox"
                                    checked={surveyData.question_ids.includes(
                                      q.id
                                    )}
                                    type="checkbox"
                                    onChange={() =>
                                      handleQuestionSelection(q.id)
                                    }
                                  />
                                  <label
                                    className="mt-2"
                                    htmlFor={`question-${q.id}`}
                                  >
                                    {" "}
                                    {q.question_text}
                                  </label>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className="pagination">
                            {Array.from(
                              {
                                length: Math.ceil(
                                  cauhois.length / questionsPerPage
                                ),
                              },
                              (_, i) => (
                                <div
                                  key={i + 1}
                                  onClick={() => handlePageChange(i + 1)}
                                  className={`btn ${
                                    currentPage === i + 1
                                      ? "btn-primary"
                                      : "btn-secondary"
                                  }`}
                                >
                                  {i + 1}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-8">
                            <div className="crancy-main-form__group crancy-main-form__group--rmargin">
                              <input
                                className="crancy-main-form__input"
                                type="text"
                                name="text"
                                placeholder="Question Text"
                                value={newQuestion.text}
                                onChange={handleNewQuestionChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="crancy-main-form__group">
                              <select
                                className="form-select"
                                name="type"
                                value={newQuestion.type}
                                onChange={handleNewQuestionChange}
                              >
                                <option value="text">Văn Bản</option>
                                <option value="multiple_choice">
                                  Lựa Chọn Nhiều
                                </option>
                                <option value="rating">Đánh Giá</option>
                                <option value="boolean">Đúng/Sai</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        {newQuestion.type === "multiple_choice" && (
                          <div className="row align-items-end">
                            <div className="col-md-10">
                              <div className="crancy-main-form__group crancy-main-form__group--rmargin">
                                <input
                                  className="crancy-main-form__input"
                                  type="text"
                                  placeholder="Lựa Chọn"
                                  value={newOption}
                                  onChange={(e) => setNewOption(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <button
                                type="button"
                                className="btn btn-secondary w-100"
                                onClick={handleAddOption}
                              >
                                {editingOptionIndex !== null
                                  ? "Cập Nhật "
                                  : "Thêm  "}
                              </button>
                            </div>
                          </div>
                        )}
                        {newQuestion.options.length > 0 && (
                          <ul className="list-group mb-3">
                            {newQuestion.options.map((opt, index) => (
                              <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                              >
                                <span>
                                  {String.fromCharCode(65 + index)}. {opt}
                                </span>
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEditOption(index)}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger mt-1"
                                    onClick={() => handleDeleteOption(index)}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                        <button
                          type="button"
                          className="btn btn-primary mb-4"
                          onClick={handleAddQuestion}
                        >
                          <FontAwesomeIcon
                            icon={
                              editingQuestionIndex !== null ? faCheck : faPlus
                            }
                          />{" "}
                          {editingQuestionIndex !== null
                            ? "Update Question"
                            : "Add Question"}
                        </button>
                        <h4>Câu Hỏi</h4>
                        {surveyData.questions.length > 0 ? (
                          <ol className="list-group mb-3">
                            {surveyData.questions.map((q, index) => (
                              <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                              >
                                <div>
                                  <strong>
                                    Q{index + 1}: {q.text}
                                  </strong>{" "}
                                  ({q.type})
                                  {q.type === "multiple_choice" && (
                                    <ul className="mt-2">
                                      {q.options.map((opt, i) => (
                                        <li key={i}>
                                          {String.fromCharCode(65 + i)}. {opt}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEditQuestion(index)}
                                  >
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDeleteQuestion(index)}
                                  >
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <p>Chưa có câu hỏi nào được thêm.</p>
                        )}
                        <div className="crancy-main-form__button">
                          <button
                            className="crancy-gbcolor"
                            type="submit"
                            disabled={loading}
                          >
                            <FontAwesomeIcon icon={faCheck} /> Cập Nhật Khảo Sát
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default SuaKhaoSat;
