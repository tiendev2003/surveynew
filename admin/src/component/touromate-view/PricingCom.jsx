import React, { useEffect,useState } from "react";
import { images } from "../../data/images";
import { Link } from "react-router-dom";
import GalleryCom from "../../component/tour-view/GalleryCom";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

function PricingCom() {

  const [imagesG, setImages] = useState(images);
  const navigate = useNavigate();
  const { touro_mate_num } = useParams();
  const [touromates, setTouromates] = useState([]);
  const [touromateImg1, setTouromateImg1] = useState("");
  const [touromateImg2, setTouromateImg2] = useState("");

  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    axios.get(baseUrl+"/touromate/touromateNum/" + touro_mate_num).then((result) => {
    const touromates = result.data[0];
    const touromates1 = result.data[1];
    const touromates2 = result.data[2];
    console.log(touromates)
    
    setTouromates(touromates);
    setTouromateImg1(touromates1.img_real_name);
    setTouromateImg2(touromates2.img_real_name);

  }
  )
  .catch((error) => {
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
                      <h5>여행친구찾기 상세</h5>
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
                            value={touromates.touro_mate_title}
                          />
                        </div>

                        <br />
                        <div className="row">
                        <div className="col-md-6">
                          <label className="form-label-title ">
                               작성자
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="작성자"
                            readOnly
                            value={touromates.user_id}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label-title ">
                               채팅 참여 인원
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="작성자"
                            readOnly
                            value={touromates.touro_mate_count}
                          />
                        </div>
                        </div>

                        {/* <br /> */}
                        {/* <div className="mb-3">
                          <label className="form-label-title">채팅참여자</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="게시글 제목"
                            readOnly
                            value={touromates.touro_mate_title}
                          />
                        </div> */}
                        <br/>  

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
                                value={touromates.touro_mate_content}
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
                              {touromates.img_real_name && 
                              <img
                                style={{ height:'400px' }}
                                className="form-control"
                                src={"http://localhost:8080/assets/images/touromateImg/"+touromates.img_real_name}
                                alt="이미지 없음"
                              />
                            }
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3">
                            {touromateImg1 &&
                              <img 
                                style={{ height:'192px' }}
                                className="form-control"
                                src={"http://localhost:8080/assets/images/touromateImg/"+touromateImg1}
                                alt="이미지 없음"
                             />
                            }
                            </div>
                            <div className="mb-3">
                            {touromateImg2 &&
                              <img
                                style={{ height:'192px' }}
                                className="form-control"
                                src={"http://localhost:8080/assets/images/touromateImg/"+touromateImg2}
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
