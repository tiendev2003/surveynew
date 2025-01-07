import React from "react";

import Wrapper from "../../component/email/Wrapper";
import Layout from "../../component/home/Layout";
import TransactionsCom from "../../component/transactions/TransactionsCom";
import useMenu from "../../hooks/useMenu";

function Transaction() {
  useMenu();
  return (
    <Layout>
      <Wrapper>
        <div className="row">
          <TransactionsCom />
        </div>
      </Wrapper>
    </Layout>
  );
}

export default Transaction;
