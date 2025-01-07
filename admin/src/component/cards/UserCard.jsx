import React from "react";
import { Link } from "react-router-dom";
 

function UserCard({ user }) {

  // 관리자 인지 유저인지 
  const isAdmin = user.adminAuthority === 0;

  const baseUrl = "http://localhost:8080/assets/images/profile";

  

  // 번호 블라인드 처리 함수
  const blindPhoneNumber = (phoneNumber) => {
    const visibleDigits = phoneNumber.slice(0, -4);
    const blindedDigits = "*".repeat(phoneNumber.length - visibleDigits.length);
    return visibleDigits + blindedDigits;
  };

  // const getUserImage = axios.get(baseUrl + "/getUserImage")


  // console.log("usr", user.imgRealName)
  const imagePath = user.imgRealName;
  // console.log(imagePath)
  return (
    <div className="col-xxl-3 col-lg-4 col-md-6 col-12">
    <div className="crancy-single-user mg-top-30">
      <div className="crancy-single-user__head">
      {user.imgRealName 
      ? <img src={`${baseUrl}/${user.imgRealName}`} alt="프로필~" style={{height:"120px", borderRadius:'50%'}}/> 
      : <img src={""} alt="프로필~" style={{height:"120px"}}/>}

        
        <h4 className="crancy-single-user__title">
          {user.userName}
        </h4>
        {isAdmin ? (
            <p className="crancy-single-user__label">admin</p>
          ) : (
            <p className="crancy-single-user__label">user</p>
          )}
      </div>
      <div className="crancy-single-user__info">
        <ul className="crancy-single-user__list">
          <li>
            Email: <Link to="#">{user.userEmail}</Link>
          </li>
          <li>
              Phone: <Link to="#">{blindPhoneNumber(user.userTel)}</Link>
            </li>
        </ul>
      </div>
      <Link to={`/profile-overview/${user.userId}`} className="crancy-btn__default">
        Overview
      </Link>
    </div>
  </div>



  );
}

export default UserCard;
