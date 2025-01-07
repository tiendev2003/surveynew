import React, { useEffect,useState } from "react";
import { images } from "../../data/images";
import { Link } from "react-router-dom";
import GalleryCom from "../../component/tour-view/GalleryCom";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";


function Heading() {
  const [imagesG, setImages] = useState(images);
  const navigate = useNavigate();
  const { tourNum } = useParams();
  const [tours, setTours] = useState({
    tour_content : "",
    tour_addr : "",
    tour_site_addr : "",
    inquiry_num : "",
    tour_tel : "",
    
  });

  const baseUrl = "http://localhost:8080";

  console.log(JSON.stringify(tours))
  useEffect(() => {
    axios.get(baseUrl + "/tour-view/" + tourNum).then((result) => {
      const toursData = result.data;
      setTours({ ...toursData });
      setImages([ 
        `../${toursData.tour_img1_path}`
        // `../${toursData.tour_img2_path}`
      ]);
    }).catch((error) => {
      console.error('검색 오류:', error);
    });
  }, [tourNum]);



  const DeleteTour = (e,tourNum,tourName) =>{
    e.preventDefault();
    console.log(tourName)
    if (window.confirm("정말로 삭제하시겠습니까?" +
                    "\n" +
                    "여행지 이름: " + 
                    `${tourName}`
    )) {
      axios.delete(`${baseUrl}/tour-list/${tourNum}`)
      navigate("/tour-list");

    }

  };
  const ModifyTour = async (e) =>{
    e.preventDefault();
    await axios.put(`${baseUrl}/tour-view/modifyTour/`+ tourNum,tours);
    navigate("/tour-list");
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12">
          <div className="crancy-section-title mg-btm-20">
            <h3 className="crancy-section__title">
            {tours.tour_name || ''}
              </h3>
          </div>
        </div>
        <GalleryCom images={imagesG} />
        <div className="row" style={{marginTop:'20px'}}>
          <label className="form-label-title ">
            여행지 상세 설명
          </label>
          <div className="col-md-6">
            <div className="mb-3">
              <textarea
                style={{ height:'400px' }}
                type="text"
                className="form-control"
                value={tours.tour_content || ''}
                onChange={(e) => setTours({ ...tours, tour_content: e.target.value })}
              >
              </textarea>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label-title ">
                여행지 주소
              </label>
              <input
                style={{ height:'50px' }}
                type="text"
                className="form-control"
                value={tours.tour_addr || ''}
                onChange={(e) => setTours({ ...tours, tour_addr: e.target.value })}
              />
              
            </div>
            <div className="mb-3">
              <label className="form-label-title ">
                여행지 웹사이트 주소
              </label>
              <input
                style={{ height:'50px' }}
                type="text"
                className="form-control"
                value={tours.tour_site_addr || ''}
                onChange={(e) => setTours({ ...tours, tour_site_addr: e.target.value })}
              />
            </div>
            {/* <div className="mb-3">
              <label className="form-label-title ">
                여행지 전화번호
              </label>
              <input
                style={{ height:'50px' }}
                type="text"
                className="form-control"
                value={tours.tour_tel || ''}
                onChange={(e) => setTours({ ...tours, tour_tel: e.target.value })}
              />
              
            </div> */}
            <div className="row">
              <div className="col" style={{paddingRight:'10px'}}>
                <label className="form-label-title ">
                  여행지 별점
                </label>
                <input
                  style={{ height:'50px'}}
                  type="text"
                  className="form-control"
                  readOnly
                  value={tours.tour_star || ''}
                />
              </div>
            </div>
            
          </div>
          
          <div className="md-3" style={{display:'flex'}}>
            <div className="col">
                <Link
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#email_modal"
                  className="crancy-btn crancy-sbcolor"
                  style={{width:'100%', justifyContent:'center'}}
                  onClick={ModifyTour} 
                >
                  Modify
                </Link>
            </div>
            <div className="col">
                <Link
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#email_modal"
                  className="crancy-btn crancy-rbcolor"
                  style={{width:'100%', justifyContent:'center'}}
                  onClick={(e) => DeleteTour(e,tours.tour_num, tours.tour_name)} 
                >
                  Delete
                </Link>
            </div>
          

          </div>
        </div>
        
      </div>
      {/* <!-- Gallery Nav --> */}
      
    </>
  );
}

export default Heading;
