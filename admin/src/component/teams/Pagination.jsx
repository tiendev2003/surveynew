import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Pagination({ show, users, page, setPage, setShow }) {
  const totalPages = Math.ceil(users.length / show);

  const indexOfLastItem = page * show;
  const indexOfFirstItem = indexOfLastItem - show;
  
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
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
          { length: Math.min(10, Math.ceil(users.length / show)) },
          (_, index) => page + index 
        )
        .filter((pageNumber) => pageNumber > 0 && pageNumber <= Math.ceil(users.length / show)) 
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
            page === Math.ceil(users.length / show) ? "disabled" : ""
          }`}
          id="crancy-table__main_next"
          onClick={() =>
            page < Math.ceil(users.length / show) &&
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
  );
}

export default Pagination;
