import React, { useEffect,useState } from "react";
import { images } from "../../data/images";
import { Link } from "react-router-dom";
import GalleryCom from "../../component/tour-view/GalleryCom";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

function PricingCom() {

  const [imagesG, setImages] = useState(images);
  const navigate = useNavigate();
  const { touroview_num } = useParams();
  const [touroviews, setTouroviews] = useState([]);
  const [touroviewsImg1, setTouroviewsImg1] = useState("");
  const [touroviewsImg2, setTouroviewsImg2] = useState("");


  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    axios.get(baseUrl+"/tour-list/touroviewNum/" + touroview_num)
    .then((result) => {
      // console.log(result.data);
      const touroviews = result.data[0];
      const touroviews1 = result.data[1];
      const touroviews2 = result.data[2];
      // console.log("touroviews")
      console.log(touroviews)
      if(touroviews.img_real_name == null || touroviews1.img_real_name == null || touroviews2.img_real_name == null) {
        touroviews.img_real_name = "";
        setTouroviewsImg1("")
        setTouroviewsImg2("")
        setTouroviews(touroviews)
      }else {
        setTouroviews(touroviews)
        setTouroviewsImg1(touroviews1.img_real_name)
        setTouroviewsImg2(touroviews2.img_real_name)
      }
      // console.log(result);
      // console.log("===============")
      // console.log(touroviews)
        
    }
  ).catch((error) => {
    console.error('검색 오류:', error);
  });
  }, []);





  return (
    <>
      <div className="row">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12">
        </div>
      </div>
      <div className="row">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>여행후기 상세 페이지</h5>
                    </div>
                    <div className="card-body">
                      <form className="theme-form mega-form">
                        <div className="mb-3">
                          <label className="form-label-title">제목</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="게시글 제목"
                            readOnly
                            value={touroviews.touroview_title}
                          />
                        </div>

                        <br />

                        <div className="mb-3">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="작성자"
                            readOnly
                            value={touroviews.user_id}
                          />
                        </div>

                        <br />

                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label-title ">
                                여행지 설명
                              </label>
                              <input
                                style={{ height:'200px' }}
                                className="form-control"
                                type="text"
                                placeholder="여행지 설명"
                                readOnly
                                value={touroviews.touroview_content}
                              />
                            </div>
                          </div>
                        </div>

                        <br />

                        <div className="row">
                          <label className="form-label-title ">
                            여행지 이미지
                          </label>
                          <div className="col-md-6">
                            <div className="mb-3">
                              {touroviews.img_real_name &&
                              <img
                                style={{ height:'400px' }}
                                className="form-control"
                                src={"http://localhost:8080/assets/images/touroviewImg/"+touroviews.img_real_name}
                                alt="이미지 없음"
                              />
                            }
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3">
                            {touroviewsImg1 &&
                              <img
                                style={{ height:'192px' }}
                                className="form-control"
                                src={"http://localhost:8080/assets/images/touroviewImg/"+touroviewsImg1}
                                alt="이미지 없음"
                              />
                            }
                            </div>
                            <div className="mb-3">
                            {touroviewsImg2 &&
                              <img
                                style={{ height:'192px' }}
                                className="form-control"
                                src={"http://localhost:8080/assets/images/touroviewImg/"+touroviewsImg2}
                                alt="이미지 없음"
                              />
                            }
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PricingCom;
