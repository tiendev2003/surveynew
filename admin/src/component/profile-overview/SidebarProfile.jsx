import React, { useEffect, useState } from "react";
import profileImg from "../../assets/img/profile-single-thumb.png";
import socialImg from "../../assets/img/social-1.png";
import socialImg2 from "../../assets/img/social-2.png";
import socialImg3 from "../../assets/img/social-3.png";
import socialImg4 from "../../assets/img/social-4.png";
import socialImg5 from "../../assets/img/social-5.png";
import { useParams } from "react-router-dom";
import axios from "axios";

function SidebarProfile() {

  const {user_id} = useParams();
  console.log(user_id)
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState("");

  
  
  const baseUrl = "http://localhost:8080";
  const imgUrl = "http://localhost:8080/assets/images/profile/"+user.imgRealName;
  const defaultimgUrl = "http://localhost:8080/assets/images/profile/"+profile;


  useEffect(() => {
    axios.get(baseUrl + '/user/userListOne/' + user_id).then((result) => {
      const users = result.data;
      console.log(users)
      if(users.imgRealName == "5ee25b671da2a46f118d0a4454d822a5" || user.imgRealName == null) {
        setProfile("default_profile.png")
      }
      setUser(users);
    }).catch(err => console.log(err)) 
  },[])

  const convertLoc = (preferLoc) => {
    switch (preferLoc) {
      case "1.0":
        preferLoc = "서울"
        break;
      case "2.0":
        preferLoc = "인천"
        break;
      case "3.0":
        preferLoc = "대전"
        break;
      case "31.0":
        preferLoc = "경기도"
        break;
      case "32.0":
        preferLoc = "강원특별자치도"
        break;
      case "33.0":
        preferLoc = "충청북도"
        break;
      case "34.0":
        preferLoc = "충청남도"
        break;
      case "35.0":
        preferLoc = "경상북도"
        break;
      case "36.0":
        preferLoc = "경상남도"
        break;
      case "37.0":
        preferLoc = "전라북도"
        break;
      case "38.0":
        preferLoc = "전라남도"
        break;
      case "39.0":
        preferLoc = "제주도"
        break;
      case "4.0":
        preferLoc = "대구"
        break;
      case "5.0":
        preferLoc = "광주"
        break;
      case "6.0":
        preferLoc = "부산"
        break;
      case "7.0":
        preferLoc = "울산"
        break;
      case "8.0":
        preferLoc = "세종특별자치시"
        break;
      
    }
    return preferLoc;
  }




  return (
    <div className="col crancy-upinner__column1">
      {/* <!-- Profile Card --> */}
      <div className="crancy-upcard mg-top-30">
        <div className="crancy-upcard__thumb">
          {user.imgRealName == "5ee25b671da2a46f118d0a4454d822a5" || user.imgRealName == null
          ? <img src={defaultimgUrl} alt="#" style={{width :"150px", height:"150px"}}/>
          : <img src={imgUrl} alt="#" style={{width :"150px", height:"150px"}}/>}
          
        </div>
        <div className="crancy-upcard__heading">
          <h3 className="crancy-upcard__title"><b>{user.userName}</b></h3>
          <div className="crancy-upcard__location">
            <svg
              width="14"
              height="19"
              viewBox="0 0 14 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.004 0C10.5285 0 13.537 2.68429 13.9466 6.15748C14.1748 8.09221 13.6486 9.85722 12.8068 11.5479C11.4884 14.2009 9.60001 16.4241 7.46388 18.4448C7.16579 18.7267 6.87135 18.7442 6.5893 18.4732C3.98891 15.9878 1.69389 13.2787 0.497187 9.81133C-0.304503 7.48688 -0.18206 5.23091 1.19758 3.12864C1.83067 2.1675 2.6926 1.3785 3.70603 0.832444C4.71946 0.286383 5.85268 0.000345594 7.004 0ZM6.98797 10.8719C7.75518 10.8764 8.50648 10.6533 9.14684 10.231C9.78721 9.80861 10.2879 9.20592 10.5855 8.49913C10.8831 7.79235 10.9643 7.01321 10.8189 6.26028C10.6734 5.50735 10.3078 4.81445 9.76834 4.26922C9.22884 3.72399 8.53969 3.35092 7.78803 3.1972C7.03638 3.04348 6.25599 3.11601 5.54559 3.40563C4.83519 3.69525 4.22668 4.18894 3.79703 4.82425C3.36738 5.45957 3.13588 6.20797 3.13183 6.97479C3.12586 7.48431 3.22108 7.98994 3.41199 8.46242C3.6029 8.93489 3.8857 9.36481 4.24401 9.72728C4.60233 10.0897 5.02904 10.3776 5.49942 10.574C5.9698 10.7705 6.47451 10.8718 6.98432 10.8719H6.98797Z" />
            </svg>
            <p className="crancy-upcard__text crancy-pcolor">
            <b>{user.userAddr}</b>
            </p>
          </div>
        </div>
        <ul className="crancy-upcard__list">
          <li>
            <b>아이디 : </b> {user.userId}
          </li>
          <li>
            <b>전화번호 : </b> {user.userTel}
          </li>
          <li>
            <b>이메일 : </b> {user.userEmail}
          </li>
          <li>
            <b>성별 : </b> {user.userGender}
          </li>
          <li>
            <b>가입 날짜 :</b>{" "}
              {user.userRegisterDate}
          </li>
          <li>
            <b>선호 관광지</b> 
            <span className="crancy-pcolor crancy-upcard__list--label">
              1순위 {user.userPreferType1}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span className="crancy-pcolor crancy-upcard__list--label">
              2순위 {user.userPreferType2}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span className="crancy-pcolor crancy-upcard__list--label">
              3순위 {user.userPreferType3}
            </span>
          </li>
          <li>
            <b>선호 지역</b> 
            <span className="crancy-pcolor crancy-upcard__list--label">
              1순위 {convertLoc(user.userPreferLoc1)}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span className="crancy-pcolor crancy-upcard__list--label">
              2순위 {convertLoc(user.userPreferLoc2)}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span className="crancy-pcolor crancy-upcard__list--label">
              3순위 {convertLoc(user.userPreferLoc3)}
            </span>
          </li>
        </ul>
        {/* <ul className="crancy-upcard__social">
          <li>
            <a href="#">
              <img src={socialImg} />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={socialImg2} />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={socialImg3} />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={socialImg4} />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={socialImg5} />
            </a>
          </li>
        </ul> */}
      </div>
      {/* <!-- End Profile Card --> */}
    </div>
  );
}

export default SidebarProfile;
