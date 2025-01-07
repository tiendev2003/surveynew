import React from "react";
import Layout from "../../component/home-two/Layout";
import BreadCrumb from "../../component/home-two/BreadCrumb";
import Wrapper from "../../component/touroview-view/Wrapper";
import PricingCom from "../../component/touroview-view/PricingCom";
import FunFact from "../../component/pricing/FunFact";
import useMenu from "../../hooks/useMenu";

function Pricing() {
  useMenu();
  return (
    <Layout>
      <BreadCrumb title="후기 게시판 상세 페이지" link="/pricing" />
      <Wrapper>
        <PricingCom />
        {/* <FunFact /> */}
      </Wrapper>
    </Layout>
  );
}

export default Pricing;
