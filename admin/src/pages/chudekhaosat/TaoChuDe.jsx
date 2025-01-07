import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Wrapper from "../../component/email/Wrapper";
import Layout from "../../component/home/Layout";
import { createTopic } from "../../features/chude/chudeSlice";
import useMenu from "../../hooks/useMenu";

const TaoChuDe = () => {
  useMenu();

  const dispatch = useDispatch();
  const [topicData, setTopicData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTopicData({ ...topicData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createTopic(topicData)).unwrap();
      toast.success("Topic created successfully!");
      setTopicData({
        name: "",
      });
    } catch (error) {
      toast.error("Failed to create topic.");
    }
  };

  return (
    <Layout>
      <Wrapper>
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <h1 className="mb-4">Tạo Chủ Đề</h1>
              <div className="crancy-main-form">
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
                          <button className="crancy-gbcolor" type="submit">
                            Tạo Chủ Đề
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

export default TaoChuDe;
