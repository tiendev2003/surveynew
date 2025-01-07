import React, { useState } from "react";
import { transactions } from "../../data/transactions";
import TransactionItem from "./TransactionItem";

function TransactionsCom({ className }) {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(25);
  return (
    <div
      className={className ? className : "col-xxl-9 col-12 crancy-main__column"}
    >
      <div className="crancy-body">
        {/* <!-- Dashboard Inner --> */}
        <div className="crancy-dsinner">
          <div className="crancy-table crancy-table--v3 mg-top-30">
            <table
              id="crancy-table__main"
              className="crancy-table__main crancy-table__main-v3"
            >
              {/* <!-- crancy Table Head --> */}
              <thead className="crancy-table__head">
                <tr>
                  <th className="crancy-table__column-1 crancy-table__h1">
                    <div className="crancy-wc__checkbox">
                      <span>ID</span>
                      <span>Customer name</span>
                    </div>
                  </th>
                  <th className="crancy-table__column-2 crancy-table__h2">
                    Date
                  </th>
                  <th className="crancy-table__column-3 crancy-table__h3">
                    Amount
                  </th>
                  <th className="crancy-table__column-4 crancy-table__h4">
                    Payment
                  </th>
                  <th className="crancy-table__column-5 crancy-table__h5">
                    Status
                  </th>
                </tr>
              </thead>
              {/* <!-- crancy Table Body --> */}
              <tbody className="crancy-table__body">
                {transactions?.map((transaction, index) => {
                  const current = page * show;
                  const previous = current - show;
                  if (
                    previous > 0 &&
                    index + 1 > previous &&
                    index + 1 <= current
                  ) {
                    return (
                      <TransactionItem
                        transaction={transaction}
                        key={index + "key"}
                      />
                    );
                  } else if (page == 1) {
                    return (
                      index < page * show && (
                        <TransactionItem
                          transaction={transaction}
                          key={index + "key"}
                        />
                      )
                    );
                  }
                })}
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
              <div
                className="dataTables_length"
                id="crancy-table__main_length"
                style={{ display: "flex" }}
              >
                <label
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <span> Show result: </span>
                  <select
                    name="crancy-table__main_length"
                    aria-controls="crancy-table__main"
                    className="form-select form-select-sm"
                    defaultValue={25}
                    onChange={(e) => setShow(e.target.value)}
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
                    Array(Math.ceil(transactions.length / show)).keys("n")
                  ).map((id, index) => (
                    <li
                      className={`paginate_button page-item ${
                        page === index + 1 ? "active" : ""
                      }`}
                      onClick={() => setPage(index + 1)}
                      key={index + "key"}
                    >
                      <a
                        aria-controls="crancy-table__main"
                        data-dt-idx="0"
                        tabIndex="0"
                        className="page-link"
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
                  <li
                    className={`paginate_button page-item next ${
                      page === transactions.length % show < 1 ? "disabled" : ""
                    }`}
                    id="crancy-table__main_next"
                    onClick={() =>
                      page < Math.ceil(transactions.length / show) &&
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
            {/* pagination end  */}
          </div>
        </div>
        {/* <!-- End Dashboard Inner --> */}
      </div>
    </div>
  );
}

export default TransactionsCom;
