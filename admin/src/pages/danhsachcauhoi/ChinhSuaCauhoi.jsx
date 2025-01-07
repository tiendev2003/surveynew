import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import { toast } from "react-toastify";
import Wrapper from "../../component/email/Wrapper";
import Layout from "../../component/home/Layout";
import {
  editQuestion,
  fetchQuestionById,
} from "../../features/cauhoi/cauhoiSlice";
import { fetchTopics } from "../../features/chude/chudeSlice";
import useMenu from "../../hooks/useMenu";

const ChinhSuaCauhoi = () => {
  useMenu();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cauhoi } = useSelector((state) => state.cauhoi);
  const { chudes } = useSelector((state) => state.chude);
  const [questionData, setQuestionData] = useState({
    question_text: "",
    question_type: "text",
    options: [],
    survey_type_id: "",
  });
  const [newOption, setNewOption] = useState("");
  const [editingOptionIndex, setEditingOptionIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestionById(id));
    dispatch(fetchTopics());
  }, [dispatch, id]);

  useEffect(() => {
    if (cauhoi) {
      setQuestionData({
        ...cauhoi,
        options: cauhoi?.options?.map((option) => option.option_text),
        survey_type_id: cauhoi.survey_type_id,
      });
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [cauhoi]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleAddOption = () => {
    if (!newOption.trim()) {
      alert("Option text cannot be empty.");
      return;
    }
    if (questionData.options?.length >= 4 && editingOptionIndex === null) {
      alert("You can only add up to 4 options.");
      return;
    }
    if (editingOptionIndex !== null) {
      const updatedOptions = [...questionData.options];
      updatedOptions[editingOptionIndex] = newOption;
      setQuestionData({ ...questionData, options: updatedOptions });
      setEditingOptionIndex(null);
    } else {
      setQuestionData({
        ...questionData,
        options: [...questionData.options, newOption],
      });
    }
    setNewOption("");
  };

  const handleEditOption = (index) => {
    setNewOption(questionData.options[index]);
    setEditingOptionIndex(index);
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = questionData.options.filter((_, i) => i !== index);
    setQuestionData({ ...questionData, options: updatedOptions });
  };

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setQuestionData({
      ...questionData,
      options: arrayMove(questionData.options, oldIndex, newIndex),
    });
  };

  const SortableItem = SortableElement(({ value, index ,element}) => (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>{String.fromCharCode(65 + element)}. {value}</span>
      <div>
        <button
          type="button"
          className="btn btn-sm btn-warning me-2"
          onClick={() => handleEditOption(index)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger mt-1"
          onClick={() => handleDeleteOption(index)}
        >
          Delete
        </button>
      </div>
    </li>
  ));

  const SortableList = SortableContainer(({ items }) => (
    <ul className="list-group mb-3">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} element={index} />
      ))}
    </ul>
  ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(editQuestion({ ...questionData, id })).unwrap();
      toast.success("Question updated successfully!");
    } catch (error) {
      toast.error("Failed to update question.");
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
              <h1 className="mb-4">Chỉnh Sửa Câu Hỏi</h1>
              <div className="crancy-main-form">
                {loading ? (
                  <div className="loading-spinner">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <Fragment>
                    {questionData != undefined && (
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-12">
                            <div className="crancy-main-form__inner">
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
                                      name="question_text"
                                      placeholder="Question Text"
                                      value={questionData?.question_text}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                  <div className="crancy-main-form__group">
                                    <select
                                      className="form-select"
                                      name="question_type"
                                      value={questionData?.question_type}
                                      onChange={handleChange}
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
                              <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                  <div className="crancy-main-form__group crancy-main-form__group--rmargin">
                                    <select
                                      className="form-select"
                                      name="survey_type_id"
                                      value={questionData.survey_type_id}
                                      onChange={handleChange}
                                      required
                                    >
                                      <option value="">Chọn Chủ Đề</option>
                                      {chudes.map((chude) => (
                                        <option key={chude.id} value={chude.id}>
                                          {chude.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              {questionData?.question_type ===
                                "multiple_choice" && (
                                <div className="row align-items-end">
                                  <div className="col-md-10">
                                    <div className="crancy-main-form__group crancy-main-form__group--rmargin">
                                      <input
                                        className="crancy-main-form__input"
                                        type="text"
                                        placeholder="Lựa Chọn"
                                        value={newOption}
                                        onChange={(e) =>
                                          setNewOption(e.target.value)
                                        }
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
                              {questionData?.options?.length > 0 && (
                                <SortableList items={questionData.options} onSortEnd={handleSortEnd} />
                              )}
                              <div className="crancy-main-form__button">
                                <button
                                  className="crancy-gbcolor"
                                  type="submit"
                                  disabled={loading}
                                >
                                  Cập Nhật Câu Hỏi
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default ChinhSuaCauhoi;
