import React, { useEffect,useState } from "react";
import SelectInput from "../form/SelectInput";
import { ticketsList } from "../../data/ticketsList";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SupportTicketsList() {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(25);
  const [isBlind, setIsBlind] = useState(false); 
  

  const current = page * show;
  const previous = current - show;

  const [touroviews, setTouroviews] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [originalTouroviews, setOriginalTouroviews] = useState([]); 

  const baseUrl = "http://localhost:8080";
  const navigate = useNavigate();

  // 게시물 블라인드 처리하기
  const handleButtonClick = (touroview_num) => {
    // setIsBlind(!isBlind);
    axios.post(`${baseUrl}/touroview/blind/${touroview_num}`)
    .then(() => {
      setIsBlind(prevState => !prevState); // 상태 업데이트 
      console.log("success")
    })
    .catch((err) => console.log(err))
  };

  // 현재 페이지에 해당하는 아이템들을 추출
  const indexOfLastItem = page * show;
  const indexOfFirstItem = indexOfLastItem - show;
  
  const currentItems = touroviews.slice(indexOfFirstItem, indexOfLastItem);

  
  
  // 디테일 페이지 가기
  const detailTouroviewNum = (e,touroview_num) => {
    e.preventDefault(); // a 태그의 기본 기능 막기
    // axios.get(`${baseUrl}/tour-list/touroviewNum/${touroview_num}`)
    // .then((result) => {
    //   const tourDetails = result.data;
    //   console.log(tourDetails)
    // })
    // .catch((error) => {
    //   console.error('에러 발생:', error);
    // }); 
    navigate(`/touroview/${touroview_num}`);
  };

  // 페이지네이션
  
  // 후기 게시판 리스트 내에서 검색
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${baseUrl}/touroview-list/search_touro?search_touro=${inputValue}`)
      .then((response) => {
        const tourListArray = response.data;
        console.log(tourListArray);
        if (tourListArray.length === 0) {
          // 검색 결과가 null이면 초기 리스트로 복원
          setTouroviews([...originalTouroviews]);
        } else {
          // 아니면 검색 결과로 업데이트
          setTouroviews(tourListArray);
        }
      })
      .catch((error) => {
        console.error('검색 오류:', error);
      });
  };

  // 리스트 초기화
  const forceUpdate = () => {
    setTouroviews([]);
  };

  // 후기 게시판 블라인드 횟수 가져오기
  const blindCount = (touroview_num) => {
    return axios.get(baseUrl + "/touroview-list/blind/count",{
      params:{
        touroview_num : touroview_num,
      }
    }).then((result) => {
      return result.data;
      // touroviews.report_count = result.data;
    })
  }

  // 후기 게시판 리스트 페이지
  useEffect(() => {
    axios.get(baseUrl+"/touroview-list/touroviewList")
    .then(async (result) => {
      const touroviews = result.data;

      // 각 게시물의 touroview_num을 이용하여 blindCount 호출
      for (const touroview of touroviews) {
        const blindCountResult = await blindCount(touroview.touroview_num);
        // blindCount 결과를 touroview에 업데이트
        touroview.report_count = blindCountResult;
      }
      setTouroviews([...touroviews]);
      setOriginalTouroviews([...touroviews]);
      console.log(touroviews);
    });
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* <div className="col-xxl-9 col-lg-8 col-12"> */}
        <div className="crancy-table crancy-table__support mg-top-30">
          <div className="crancy-table__heading">
            <h3 className="crancy-table__title mb-0">여행후기</h3>

            <div className="crancy-table__right">
              <form className="crancy-header__form-inner" id="dataTables_filter" onSubmit={handleSubmit}>
                <button className="search-btn" type="submit">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.1139 12.2238C7.4892 14.923 3.16075 13.4917 1.28129 10.8389C-0.69718 8.04734 -0.360234 4.26363 2.12465 1.87472C4.54242 -0.450394 8.3824 -0.627818 11.0414 1.42684C13.7204 3.49679 14.7525 7.69781 12.2702 11.0396C12.348 11.1227 12.4264 11.2111 12.5101 11.2955C13.9031 12.6896 15.2994 14.0804 16.6897 15.4772C17.2214 16.0115 17.0486 16.7923 16.3667 16.9724C15.9906 17.0714 15.7068 16.9066 15.4483 16.6474C14.1125 15.3058 12.7707 13.9701 11.4355 12.6278C11.3112 12.5042 11.2149 12.3527 11.1139 12.2238ZM1.69666 6.82731C1.69134 9.66011 3.97486 11.9547 6.81531 11.9713C9.66971 11.9879 11.9732 9.69998 11.9785 6.84392C11.9838 4.00115 9.70825 1.71258 6.86515 1.70062C4.01275 1.68866 1.70198 3.97989 1.69666 6.82731Z"
                      fill="#0A82FD"
                    ></path>
                  </svg>
                </button>
                <input
                  id="ticketinfo"
                  type="search"
                  placeholder="Search"
                  aria-controls="crancy-table__main"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </form>
              {/* <SelectInput
                options={["Last 7 days", "Last 15 days", "Last 30 days"]}
              /> */}
            </div>
          </div>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="table_1"
              role="tabpanel"
              aria-labelledby="table_1"
            >
              {/* <!-- crancy Table --> */}
              <table
                id="crancy-table__main"
                className="crancy-table__main crancy-table__ticket"
              >
                {/* <!-- crancy Table Head --> */}
                {/* 페이지에 맞게 수정하기  */}
                <thead className="crancy-table__head">
                  <tr>
                    <th className="crancy-tab le__column-1 crancy-table__h1">
                      회원 ID
                    </th>
                    <th className="crancy-tab le__column-2 crancy-table__h2">
                      여행지
                    </th>
                    <th className="crancy-table__column-3 crancy-table__h3">
                      제목
                    </th>
                    {/* <th className="crancy-table__column-3 crancy-table__h3">
                      내용
                    </th> */}
                    <th className="crancy-table__column-4 crancy-table__h4">
                      등록 및 수정 날짜
                    </th>
                    <th className="crancy-table__column-5 crancy-table__h5">
                      좋아요 수
                    </th>
                    <th className="crancy-table__column-6 crancy-table__h6">
                      신고횟수
                    </th>
                  </tr>
                </thead>
                {/* <!-- crancy Table Body --> */}
                <tbody className="crancy-table__body">
                  {currentItems?.map((touroview) => (
                        <tr key={touroview.touroview_num}>
                          <td className="crancy-table__column-1 crancy-table__data-1" onClick={(e) => detailTouroviewNum(e, touroview.touroview_num)}>
                            <div className="crancy-table__product--id">
                              <p className="crany-table__product--number">
                                <a to="/ticket-details">{touroview.user_id?.toString()}</a>
                              </p>
                            </div>
                          </td>
                          <td className="crancy-table__column-2 crancy-table__data-2" onClick={(e) => detailTouroviewNum(e, touroview.touroview_num)}>
                            <div className="crancy-table__product--id">
                              <p className="crany-table__product--number">
                                <a to="/ticket-details">{touroview.tour_name?.toString()}</a>
                              </p>
                            </div>
                          </td>
                          <td className="crancy-table__column-3 crancy-table__data-3" onClick={(e) => detailTouroviewNum(e, touroview.touroview_num)}>
                            <p className="crancy-table__inner--title">
                              <a to="/ticket-details">{touroview.touroview_title?.toString()}</a>
                            </p>
                          </td>
                          {/* <td className="crancy-table__column-4 crancy-table__data-4" onClick={(e) => detailTouroviewNum(e, touroview.touroview_num)}>
                            <p className="crancy-table__text crancy-table__time">
                              {touroview.touroview_content?.toString()}
                            </p>
                          </td> */}
                          <td className="crancy-table__column-4 crancy-table__data-4" onClick={(e) => detailTouroviewNum(e, touroview.touroview_num)}>
                            <p className="crancy-table__inner--title">
                            {touroview.touroview_update ? `${touroview.touroview_update}` : ` ${touroview.touroview_regdate}`}
                            </p>
                          </td>
                          <td className="crancy-table__column-5 crancy-table__data-5" onClick={(e) => detailTouroviewNum(e, touroview.touroview_num)}>
                           
                              {touroview.like_count}
                          </td>
                          <td className="crancy-table__column-6 crancy-table__data-6">
                            <div className="crancy-flex-between">
                              {touroview.report_count >= 3 
                              ?
                              <div> 
                              <p className="crancy-table__status crancy-table__status--cancel" style={{cursor:"pointer"}} onClick={() => handleButtonClick(touroview.touroview_num)}>X</p>
                                {/* {isBlind && (
                                  <div>
                                    <p>ok</p>
                                  </div>
                                )} */}
                                </div>
                              : <p className="crancy-table__status crancy-table__status--pending">{touroview.report_count}</p>}
                            </div>
                          </td>
                        </tr>
                ))}
                </tbody>
                {/* <!-- End crancy Table Body --> */}
              </table>
              {/* <!-- End crancy Table --> */}
              <div className="crancy-table-bottom">
                <div id="crancy-table__main_filter" className="dataTables_filter">
                  <label>
                    Search:
                    <input
                      type="search"
                      className="form-control form-control-sm"
                      placeholder=""
                      aria-controls="crancy-table__main"
                    />
                  </label>
                </div>
                <div className="dataTables_length" id="crancy-table__main_length">
                  <label>
                    Show result:
                    <select
                      name="crancy-table__main_length"
                      aria-controls="crancy-table__main"
                      className="form-select form-select-sm"
                      onChange={(e) => setShow(e.target.value)}
                      defaultValue={25}
                    >
                      <option value="4">4</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                  </label>
                </div>
                <div
                  className="dataTables_paginate paging_simple_numbers"
                  id="crancy-table__main_paginate"
                >
                  <ul className="pagination">
                    <li
                      className={`paginate_button page-item previous ${
                        page === 1 ? "disabled" : ""
                      }`}
                      id="crancy-table__main_previous"
                      onClick={() => page > 1 && setPage(page - 1)}
                    >
                      <a
                        aria-controls="crancy-table__main"
                        data-dt-idx="previous"
                        tabIndex="0"
                        className="page-link"
                      >
                        <i className="fas fa-angle-left"></i>
                      </a>
                    </li>
                    {Array.from(
                      { length: Math.min(10, Math.ceil(touroviews.length / show)) },
                      (_, index) => page + index 
                    )
                    .filter((pageNumber) => pageNumber > 0 && pageNumber <= Math.ceil(touroviews.length / show)) 
                    .map((pageNumber, index) => (
                      <li
                        className={`paginate_button page-item ${
                          page === pageNumber ? "active" : ""
                        }`}
                        onClick={() => setPage(pageNumber)}
                        key={pageNumber}
                      >
                        <a
                          aria-controls="crancy-table__main"
                          data-dt-idx="0"
                          tabIndex="0"
                          className="page-link"
                        >
                          {pageNumber}
                        </a>
                      </li>
                    ))}
                    <li
                      className={`paginate_button page-item next ${
                        page === Math.ceil(touroviews.length / show) ? "disabled" : ""
                      }`}
                      id="crancy-table__main_next"
                      onClick={() =>
                        page < Math.ceil(touroviews.length / show) &&
                        setPage(page + 1)
                      }
                    >
                      <a
                        aria-controls="crancy-table__main"
                        data-dt-idx="next"
                        tabIndex="0"
                        className="page-link"
                      >
                        <i className="fas fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default SupportTicketsList;
