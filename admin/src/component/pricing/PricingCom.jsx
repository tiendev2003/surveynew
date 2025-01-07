import React, { useEffect,useState } from "react";
import { images } from "../../data/images";
import { Link } from "react-router-dom";
import GalleryCom from "../../component/tour-view/GalleryCom";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

function PricingCom() {

  const [imagesG, setImages] = useState(images);
  const navigate = useNavigate();
  const { touromate_num } = useParams();
  const [touromates, setTouromates] = useState([]);

  const baseUrl = "http://localhost:8080";

  // 기본
  useEffect(() => {
    axios.get(baseUrl+"/tour-list/touroviewNum/" + touroview_num).then((result) => {
    const touroviews = result.data;
    console.log(result);
    setTouroviews({...touroviews});
      
  }
  )
  .catch((error) => {
    console.error('검색 오류:', error);
  });
  }, []);

  // 경로 에러 때문에 db에서 받아온 이미지 선언 
  const imagePath1 = typeof touroviews.tour_img1_path === 'string' ? touroviews.tour_img1_path.replace(/\\/g, '/') : "";
  const imagePath2 = typeof touroviews.tour_img2_path === 'string' ? touroviews.tour_img2_path.replace(/\\/g, '/') : "";


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
                      <h5>상세 페이지</h5>
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
                            value={touroviews.touroview_title || ''}
                          />
                        </div>

                        <br />

                        <div className="mb-3">
                        <label className="form-label-title">ID</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="작성자"
                            readOnly
                            value={touroviews.user_id || ''}
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
                                value={touroviews.touroview_content || ''}
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
                              <img
                                style={{ height:'618px' ,border:'none', backgroundColor:"white" }}
                                className="form-control"
                                readOnly
                                src={imagePath2 ? `../${imagePath2}` : '이미지가 없습니다.'}
                                alt=""
                              />
                            </div>
                          </div>

                          <div className="col-md-6" >
                            <div className="mb-3" >
                              <img
                                style={{ height:'300px' ,border:'none' , backgroundColor:"white" }}
                                className="form-control"
                                readOnly
                                src={imagePath2 ? `../${imagePath1}` : '이미지가 없습니다.'}
                                alt=""
                              />
                            </div>
                            <div className="mb-3">
                              <img
                                style={{ height:'300px' ,border:'none' , backgroundColor:"white"}}
                                className="form-control"
                                readOnly
                                src={imagePath2 ? `../${imagePath2}` : '이미지가 없습니다.'}
                                alt=""
                              />
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
