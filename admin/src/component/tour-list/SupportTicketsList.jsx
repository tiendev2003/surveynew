import { useEffect,useState } from "react";
import SelectInput from "../form/SelectInput";
import { ticketsList } from "../../data/ticketsList";
import { Link } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function SupportTicketsList() {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(25);

  const [tours, setTours] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const baseUrl = "http://localhost:8080";

  // 현재 페이지에 해당하는 아이템들을 추출
  const indexOfLastItem = page * show;
  const indexOfFirstItem = indexOfLastItem - show;
  
  const currentItems = tours.slice(indexOfFirstItem, indexOfLastItem);

  const navigate = useNavigate();
  const createTour = () => {
    navigate("/tour-register");
  };

  // 여행지 상세 페이지 가는 함수 
  const detailTourNum = (e,tourNum) => {
    e.preventDefault(); // a 태그의 기본 기능 막기 
    axios.get(`${baseUrl}/tour-list/${tourNum}`)
    .then((result) => {
      const tourDetails = result.data;
    })
    .catch((error) => {
      console.error('에러 발생:', error);
    }); 
    navigate(`/tour-view/${tourNum}`);
  };



  // const detailTourName = () => {
  //   e.preventDefault();
  //   navigate("/tour-view/${tourName}");
  // };

  
  // 여행지 내부에서 검색
  const handleSubmit = (e) => {
    forceUpdate();
    e.preventDefault();
    axios
      .get(`${baseUrl}/search_tourName?search_tourName=${inputValue}`)
      .then((response) => {
      // 서버 응답 데이터에서 tourList 키에 해당하는 배열을 추출
      const tourListArray = response.data;
      // 상태 업데이트
      setTours(tourListArray);
      })
      .catch((error) => {
        console.error('검색 오류:', error);
      });
  };

  // 삭제 함수 
  const deleteTourNum = (e,tourNum,tourName) => {
    e.preventDefault();
    console.log(tourName)
    if (window.confirm("정말로 삭제하시겠습니까?" +
                    "\n" +
                    "여행지 이름: " + 
                    `${tourName}`
    )) {
      axios.delete(`${baseUrl}/tour-list/${tourNum}`).then((result) => {
        handleSubmit(e);   
      });
    }
  };


    const forceUpdate = () => {
    // 빈 객체를 생성하여 상태를 변경함으로써 강제로 다시 렌더링
    setTours([]);
  };

  // 여행지 리스트 자체 select
  useEffect(() => {
    axios.get(baseUrl+"/tour-list").then((result) => {
      const tours = result.data;
      console.log(tours);
      setTours([...tours]);
      
    });
  }, []);
  
  return (
    <div className="container-fluid p-0">
      {/* <div className="col-xxl-9 col-lg-8 col-12"> */}
        <div className="crancy-table crancy-table__support mg-top-30">
          <div className="crancy-table__heading">
            <h3 className="crancy-table__title mb-0">여행지</h3>

            <div className="crancy-table__right">
              <form className="crancy-header__form-inner" id="dataTables_filter" onSubmit={handleSubmit} >
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
              <Link onClick={createTour} className="crancy-btn crancy-sbcolor crancy-btn__profile">
                여행지 등록
              </Link>
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
                      번호
                    </th>
                    <th className="crancy-table__column-2 crancy-table__h2">
                      여행지명
                    </th>
                    <th className="crancy-table__column-4 crancy-table__h4">
                      수정
                      
                    </th>
                    <th className="crancy-table__column-5 crancy-table__h5">
                      삭제
                    </th>
                  </tr>
                </thead>
                {/* <!-- crancy Table Body --> */}
              <tbody className="crancy-table__body" >
                {currentItems.map((tour) => (
                  <tr key={tour.tourNum}>
                    <td className="crancy-table__column-1 crancy-table__data-1" onClick={(e) => detailTourNum(e, tour.tourNum)}>
                      <div className="crancy-table__product--id">
                                <p className="crany-table__product--number">
                                  <a >{tour.tourNum?.toString()}</a>
                                </p>
                      </div>
                    </td>
                    <td className="crancy-table__column-2 crancy-table__data-2" onClick={(e) => detailTourNum(e, tour.tourNum)}>
                      <h5 className="crancy-table__inner--title">
                                <a >{tour.tourName?.toString()}
                                </a>
                      </h5>
                    </td>
                    <td className="crancy-table__column-5 crancy-table__data-5">
                      <div className="crancy-table__status"
                       onClick={(e) => detailTourNum(e, tour.tourNum)}>
                        Update 
                      </div>
                    </td>
                    <td className="crancy-table__column-5 crancy-table__data-5">
                      <div className="crancy-table__status crancy-table__status--cancel"
                      onClick={(e) => deleteTourNum(e, tour.tourNum,tour.tourName )}>
                        Delete
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
                      onClick={() => page > 0 && setPage(page - 1)}
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
                      { length: Math.min(10, Math.ceil(tours.length / show)) },
                      (_, index) => page + index 
                    )
                    .filter((pageNumber) => pageNumber > 0 && pageNumber <= Math.ceil(tours.length / show)) 
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
                        page === Math.ceil(tours.length / show) ? "disabled" : ""
                      }`}
                      id="crancy-table__main_next"
                      onClick={() =>
                        page < Math.ceil(tours.length / show) &&
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
            <div
              className="tab-pane fade"
              id="table_2"
              role="tabpanel"
              aria-labelledby="table_1"
            >
              {/* <!-- crancy Table --> */}
              <table
                id="crancy-table__main"
                className="crancy-table__main crancy-table__ticket"
              >
                {/* <!-- crancy Table Head --> */}
                <thead className="crancy-table__head">
                  <tr>
                    <th className="crancy-table__column-1 crancy-table__h1">
                      ID
                    </th>
                    <th className="crancy-table__column-2 crancy-table__h2">
                      Subject
                    </th>
                    <th className="crancy-table__column-3 crancy-table__h3">
                      Date
                    </th>
                    <th className="crancy-table__column-4 crancy-table__h4">
                      Customer
                    </th>
                    <th className="crancy-table__column-5 crancy-table__h5">
                      Status
                    </th>
                    <th className="crancy-table__column-6 crancy-table__h6">
                      Priority
                    </th>
                  </tr>
                </thead>
                {/* <!-- crancy Table Body --> */}
                <tbody className="crancy-table__body">
                  <tr>
                    <td className="crancy-table__column-1 crancy-table__data-1">
                      <div className="crancy-table__product--id">
                        <p className="crany-table__product--number">
                          <a href="ticket-details.html">#3356</a>
                        </p>
                      </div>
                    </td>
                    <td className="crancy-table__column-2 crancy-table__data-2">
                      <h5 className="crancy-table__inner--title">
                        <a href="ticket-details.html">
                          AuthorID checks for AudioJungle find that...
                        </a>
                      </h5>
                    </td>
                    <td className="crancy-table__column-3 crancy-table__data-3">
                      <p className="crancy-table__text crancy-table__time">
                        2/05/2023
                      </p>
                    </td>
                    <td className="crancy-table__column-4 crancy-table__data-4">
                      <h5 className="crancy-table__inner--title">
                        Dianne Russell
                      </h5>
                    </td>
                    <td className="crancy-table__column-5 crancy-table__data-5">
                      <div className="crancy-table__status">Done</div>
                    </td>
                    <td className="crancy-table__column-6 crancy-table__data-6">
                      <div className="crancy-flex-between">
                        <h5 className="crancy-table__inner--title">High</h5>
                        <div className="crancy-chatbox__toggle">
                          <svg
                            width="6"
                            height="25"
                            viewBox="0 0 4 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 14)"
                            ></circle>
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 8)"
                            ></circle>
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 2)"
                            ></circle>
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="crancy-table__column-1 crancy-table__data-1">
                      <div className="crancy-table__product--id">
                        <p className="crany-table__product--number">
                          <a href="ticket-details.html">#3356</a>
                        </p>
                      </div>
                    </td>
                    <td className="crancy-table__column-2 crancy-table__data-2">
                      <h5 className="crancy-table__inner--title">
                        <a href="ticket-details.html">
                          You’ve spent hours researching ...
                        </a>
                      </h5>
                    </td>
                    <td className="crancy-table__column-3 crancy-table__data-3">
                      <p className="crancy-table__text crancy-table__time">
                        2/05/2023
                      </p>
                    </td>
                    <td className="crancy-table__column-4 crancy-table__data-4">
                      <h5 className="crancy-table__inner--title">Adim Makram</h5>
                    </td>
                    <td className="crancy-table__column-5 crancy-table__data-5">
                      <div className="crancy-table__status crancy-table__status--cancel">
                        Cancel
                      </div>
                    </td>
                    <td className="crancy-table__column-6 crancy-table__data-6">
                      <div className="crancy-flex-between">
                        <h5 className="crancy-table__inner--title">Law</h5>
                        <div className="crancy-chatbox__toggle">
                          <svg
                            width="6"
                            height="25"
                            viewBox="0 0 4 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 14)"
                            ></circle>
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 8)"
                            ></circle>
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 2)"
                            ></circle>
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="crancy-table__column-1 crancy-table__data-1">
                      <div className="crancy-table__product--id">
                        <p className="crany-table__product--number">
                          <a href="ticket-details.html">#3356</a>
                        </p>
                      </div>
                    </td>
                    <td className="crancy-table__column-2 crancy-table__data-2">
                      <h5 className="crancy-table__inner--title">
                        <a href="ticket-details.html">
                          people to read the article since you worr...
                        </a>
                      </h5>
                    </td>
                    <td className="crancy-table__column-3 crancy-table__data-3">
                      <p className="crancy-table__text crancy-table__time">
                        2/05/2023
                      </p>
                    </td>
                    <td className="crancy-table__column-4 crancy-table__data-4">
                      <h5 className="crancy-table__inner--title">Adim Makram</h5>
                    </td>
                    <td className="crancy-table__column-5 crancy-table__data-5">
                      <div className="crancy-table__status crancy-table__status--pending">
                        Cancel
                      </div>
                    </td>
                    <td className="crancy-table__column-6 crancy-table__data-6">
                      <div className="crancy-flex-between">
                        <h5 className="crancy-table__inner--title">Medium</h5>
                        <div className="crancy-chatbox__toggle">
                          <svg
                            width="6"
                            height="25"
                            viewBox="0 0 4 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 14)"
                            ></circle>
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 8)"
                            ></circle>
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 2)"
                            ></circle>
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="crancy-table__column-1 crancy-table__data-1">
                      <div className="crancy-table__product--id">
                        <p className="crany-table__product--number">
                          <a href="ticket-details.html">#3356</a>
                        </p>
                      </div>
                    </td>
                    <td className="crancy-table__column-2 crancy-table__data-2">
                      <h5 className="crancy-table__inner--title">
                        <a href="ticket-details.html">
                          here’s the sad truth: on average...
                        </a>
                      </h5>
                    </td>
                    <td className="crancy-table__column-3 crancy-table__data-3">
                      <p className="crancy-table__text crancy-table__time">
                        2/05/2023
                      </p>
                    </td>
                    <td className="crancy-table__column-4 crancy-table__data-4">
                      <h5 className="crancy-table__inner--title">Jenny Wilson</h5>
                    </td>
                    <td className="crancy-table__column-5 crancy-table__data-5">
                      <div className="crancy-table__status">Done</div>
                    </td>
                    <td className="crancy-table__column-6 crancy-table__data-6">
                      <div className="crancy-flex-between">
                        <h5 className="crancy-table__inner--title">High</h5>
                        <div className="crancy-chatbox__toggle">
                          <svg
                            width="6"
                            height="25"
                            viewBox="0 0 4 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 14)"
                            ></circle>
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 8)"
                            ></circle>
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 2)"
                            ></circle>
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="crancy-table__column-1 crancy-table__data-1">
                      <div className="crancy-table__product--id">
                        <p className="crany-table__product--number">
                          <a href="ticket-details.html">#3356</a>
                        </p>
                      </div>
                    </td>
                    <td className="crancy-table__column-2 crancy-table__data-2">
                      <h5 className="crancy-table__inner--title">
                        <a href="ticket-details.html">
                          AuthorID checks for AudioJungle find that...
                        </a>
                      </h5>
                    </td>
                    <td className="crancy-table__column-3 crancy-table__data-3">
                      <p className="crancy-table__text crancy-table__time">
                        2/05/2023
                      </p>
                    </td>
                    <td className="crancy-table__column-4 crancy-table__data-4">
                      <h5 className="crancy-table__inner--title">
                        Dianne Russell
                      </h5>
                    </td>
                    <td className="crancy-table__column-5 crancy-table__data-5">
                      <div className="crancy-table__status">Done</div>
                    </td>
                    <td className="crancy-table__column-6 crancy-table__data-6">
                      <div className="crancy-flex-between">
                        <h5 className="crancy-table__inner--title">High</h5>
                        <div className="crancy-chatbox__toggle">
                          <svg
                            width="6"
                            height="25"
                            viewBox="0 0 4 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 14)"
                            ></circle>
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 8)"
                            ></circle>
                            <circle
                              r="2"
                              transform="matrix(1 0 0 -1 2 2)"
                            ></circle>
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                {/* <!-- End crancy Table Body --> */}
              </table>
              {/* <!-- End crancy Table --> */}
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default SupportTicketsList;
