import React from "react";
import BreadCrumb from "../../component/home-two/BreadCrumb";
import Layout from "../../component/home-two/Layout";
import UsersCom from "../../component/user/UsersCom";
import Wrapper from "../../component/user/Wrapper";
import useMenu from "../../hooks/useMenu";

function Users() {
  useMenu();
  return (
    <Layout>
      <BreadCrumb title="Users" link="/user" />
      <Wrapper>
        <UsersCom />
      </Wrapper>
    </Layout>
  );
}

export default Users;
