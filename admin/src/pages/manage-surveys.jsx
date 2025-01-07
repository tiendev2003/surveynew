import React from "react";
import Wrapper from "../component/email/Wrapper";
import Layout from "../component/home/Layout";
import useMenu from "../hooks/useMenu";

function ManageSurveys() {
  useMenu();
  return (
    <Layout>
      <Wrapper>profle</Wrapper>
    </Layout>
  );
}

export default ManageSurveys;
