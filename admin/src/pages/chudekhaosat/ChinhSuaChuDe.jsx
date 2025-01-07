import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../component/email/Wrapper";
import Layout from "../../component/home/Layout";
import { editTopic, fetchTopicById } from "../../features/chude/chudeSlice";
import useMenu from "../../hooks/useMenu";

const ChinhSuaChuDe = () => {
  useMenu();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { chude } = useSelector((state) => state.chude);
  const [topicData, setTopicData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchTopicById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (chude) {
      setTopicData({
        name: chude.name,
      });
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [chude]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTopicData({ ...topicData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(editTopic({ ...topicData, id })).unwrap();
      toast.success("Topic updated successfully!");
    } catch (error) {
      toast.error("Failed to update topic.");
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
              <h1 className="mb-4">Chỉnh Sửa Chủ Đề</h1>
              <div className="crancy-main-form">
                {loading ? (
                  <div className="loading-spinner">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="crancy-main-form__inner">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                              <div className="crancy-main-form__group crancy-main-form__group--rmargin">
                                <input
                                  className="crancy-main-form__input"
                                  type="text"
                                  name="name"
                                  placeholder="Topic Name"
                                  value={topicData.name}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="crancy-main-form__button">
                            <button
                              className="crancy-gbcolor"
                              type="submit"
                              disabled={loading}
                            >
                              Cập Nhật Chủ Đề
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default ChinhSuaChuDe;
