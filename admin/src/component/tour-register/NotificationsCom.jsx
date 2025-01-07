import React, { useEffect,useState } from "react";

import { Link } from "react-router-dom";
import NotificationItem from "./NotificationItem.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NotificationsCom({ isSettings }) {
  const [activeNotification, setActiveNotification] = useState({
    ["All Notification update"]: true,
    "When you upload products": false,
    "You got sell your products": true,
    "Got new follower": false,
    "Got new Sale": true,
    "Author level up": false,
    "You upload your first product successfully done": true,
    "Got new followers": false,
  });
  const [tour_num, setTour_num] = useState("");
  const [tour_name, setTour_name] = useState("");
  const [tour_addr, setTour_addr] = useState("");
  const [tour_content, setTour_content] = useState("");
  const [tour_site_addr, setTour_site_addr] = useState("");
  const [file,setFile] = useState()
  const [imgSrc, setImgSrc] = useState(null); 

  const baseUrl = "http://localhost:8080";

  const navigate = useNavigate();
  const handleActiveNotification = (name) => {
    setActiveNotification({
      ...activeNotification,
      [name]: !activeNotification[name],
    });
  };

  // 취소 
  const cancelTourList = (e) =>{
    e.preventDefault();
    navigate("/tour-list");
  };

  
  const handleImageChange = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const uploadFile = e.target.files[0]
  
    if(uploadFile){
      var preview = document.getElementById('preview');
      preview.src = URL.createObjectURL(uploadFile)
      console.log(uploadFile)
      formData.append('mutipartFile',uploadFile)
      setFile(uploadFile["name"])
      console.log('===useState===')
      
      console.log("FILE",uploadFile["name"])
      
      // setImgSrc()
      
    }
    setImgSrc(uploadFile)
    console.log(imgSrc)
  }

  const handleDelete= () =>{
    setImgSrc('')
    var preview = document.getElementById('preview');
    var imageUpload = document.getElementById('image-upload');
    preview.src = ''
    imageUpload.value = ''
}

  const submitTour = async (e) =>{
    e.preventDefault();
    var imageURL = ''
    if(imgSrc != '') {
      let formData = new FormData();
      formData.append('tour_num', tour_num);
      formData.append('tour_name', tour_name);
      formData.append('tour_addr', tour_addr);
      formData.append('tour_content', tour_content);
      formData.append('tour_site_addr', tour_site_addr);
      formData.append('mutipartFile', imgSrc);
      formData.append('file', file);
      const result = await axios.post(baseUrl+"/tour-register/tourInsert", formData, {
        headers : 'Content-Type: multipart/form-data'
      });
      imageURL = result.data

    }
    // let tour ={
    //   tour_num:tour_num,
    //   tour_name:tour_name,
    //   tour_addr:tour_addr,
    //   tour_content:tour_content,
    //   tour_site_addr:tour_site_addr,
    //   imgSrc : imgSrc,
    //   file:file,
    // };
    // alert(JSON.stringify(tour));
    navigate("/tour-list");

    
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="crancy-body">
          {/* <!-- Dashboard Inner --> */}
          <div className="crancy-dsinner">
            <div
              className={`crancy-notifications crancy-notifications__all ${
                isSettings ? "" : "mg-top-30"
              }`}
            >
              {/* 여기에다 코드 붙이기 */}
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="card">
                          <div className="card-header">
                            <h5>여행지 등록</h5>
                          </div>
                          <form >
                            <div className="card-body">
                              <div className="mb-3">
                                  <label className="form-label-title">여행지 번호</label>
                                  <input
                                    className="form-control"
                                    type="number"
                                    placeholder="번호만 입력하세요"
                                    name ="tour_num"
                                    value={tour_num}
                                    onChange={(e) => {
                                      setTour_num(e.target.value);
                                    }}
                                  />
                                </div>

                                <div className="mb-3">
                                  <label className="form-label-title">여행지 명</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="여행지"
                                    name ="tour_name"
                                    value={tour_name}
                                    onChange={(e) => {
                                      setTour_name(e.target.value);
                                    }}
                                  />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label-title ">
                                      이미지 업로드
                                    </label>
                                    <div className="bootstrap-tagsinput">
                                      <div className="input-group">
                                        <input
                                          type="file" 
                                          className="form-control"
                                          multiple
                                          id="image-upload"
                                          accept=".jpg,.jpeg,.png"
                                          onChange={handleImageChange}
                                          name="file"
                                        />
                                      </div>
                                      
                                        <div style={{display: imgSrc ? 'grid':'none'}}>
                                        <span onClick={handleDelete} style={{cursor:'pointer'}}>&times;</span>
                                        <img src={''} 
                                        id='preview'
                                        alt="preview-img" 
                                        style={{ width: "30%"}}
                                        />
                                        </div>
                                      
                                    </div>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="tags"
                                    data-role="tagsinput"
                                    style={{ display: "none" }}
                                  />
                                </div>
                                
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <label className="form-label-title ">
                                        여행지 설명
                                      </label>
                                      <textarea
                                      style={{ height:'400px' }}
                                        className="form-control"
                                        placeholder="여행지 설명"
                                        name ="tour_content"
                                        value={tour_content} 
                                        onChange={(e) => {
                                          setTour_content(e.target.value);
                                        }}
                                      >
                                      </textarea>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <label className="form-label-title ">
                                        여행지 주소(위치)
                                      </label>
                                      <textarea
                                      style={{height:'174px' }}
                                        className="form-control"
                                        placeholder="여행지 주소(위치)"
                                        name = "tour_addr"
                                        value={tour_addr}
                                        onChange={(e) => {
                                          setTour_addr(e.target.value);
                                        }}
                                      >
                                      </textarea>
                                    </div>
                                    <div className="mb-3">
                                      <label className="form-label-title ">
                                        여행지 공식 사이트 주소
                                      </label>
                                      <textarea
                                      style={{height:'174px' }}
                                        className="form-control"
                                        placeholder="여행지 공식 사이트 주소"
                                        name="tour_site_addr"
                                        value={tour_site_addr}
                                        onChange={(e) => {
                                          setTour_site_addr(e.target.value);
                                        }}
                                      >
                                      </textarea>
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-end">
                              <button className="btn btn-primary btn-sm me-2" type="submit" onClick={submitTour}
                              style={{ fontSize: '12px', padding: '5px 10px' }}>Submit</button>
                              <button className="btn btn-outline-primary btn-sm ml-2" onClick={cancelTourList}
                              style={{ fontSize: '12px', padding: '5px 10px' }}>Cancel</button>
                            </div>
                          </form >
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Dashboard Inner --> */}
        </div>
      </div>
    </div>
  );
}

export default NotificationsCom;
