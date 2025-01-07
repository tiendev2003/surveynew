import React, {useEffect, useState} from "react";
import SelectInput from "../form/SelectInput";
import afghanistan from "../../assets/img/country-1.png";
import saudiArabia from "../../assets/img/country-5.png";
import bangladesh from "../../assets/img/country-2.png";
import unitedStates from "../../assets/img/country-4.png";
import axios from "axios";

function Countries() {

  const [popularTour, setpopularTour] = useState([]);

  const baseUrl = "http://localhost:8080";

  // 인기 여행지 정보 DB에서 가져오기
  useEffect(() => {
    axios.get(baseUrl+"/wishlist/popularTour")
    .then((result) => {
      const popularTours = result.data;
      // console.log(popularTours)
      setpopularTour([...popularTours]);
    });
  }, []);

  return (
    <div className="col-xl-12 col-lg-6 col-md-6 col-12 crancy-sidebar__widget">
      <div className="crancy-sidebar__single">
        {/* <!-- Sidebar Heading --> */}
        <div className="crancy-sidebar__heading">
          <h5 className="crancy-sidebar__title">인기 여행지</h5>

          {/* <SelectInput
            options={[
              "View All",
              "Last 7 Days",
              "Last 15 Days",
              "Last 30 Days",
            ]}
          /> */}
        </div>

        {/* <!-- Sidebar Creator Lists --> */}
        <div className="crancy-sidebar__creators">
          <div className="tab-content" id="nav-tabContent">
            {/* <!-- Single Tab --> */}
            <div
              className="tab-pane fade show active"
              id="seller_tab-1"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <ul className="crancy-sidebar__creatorlist">
                {popularTour?.map((tour, index) => (
                  <li key={index}>
                     {/* 여기 디비에서 값 불러오기 */}
                     <div className="crancy-sidebar__creator">
                       <img src={tour.tour_img1_path} alt="#" />
                       <a href="#">
                         <span className="crancy-sidebar__creator-link" style={{fontSize:'14px'}} onClick={(e) => detailTourNum(e, tour.tour_num)}>
                          {tour.tour_name}
                         </span>
                         <b className="crancy-sidebar__creator-name">{tour.tour_cate_name}</b>
                       </a>
                     </div>
                   </li>
                ))}
               
                
              </ul>
            </div>
            {/* <!-- Single Tab --> */}
          </div>
        </div>
        {/* <!-- End Sidebar Creator Lists --> */}
      </div>
    </div>
  );
}

export default Countries;
