import React from "react";

function Wrapper({ children }) {
  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col-12">
          <div className="crancy-body">
            <div className="crancy-dsinner">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wrapper;
