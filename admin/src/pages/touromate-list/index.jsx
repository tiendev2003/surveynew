import React, { useState } from "react";
import Layout from "../../component/home-two/Layout";
import BreadCrumb from "../../component/home-two/BreadCrumb";
import Wrapper from "../../component/touromate-list/Wrapper";
import SupportHistoryCard from "../../component/cards/SupportHistoryCard";
import SupportTracker from "../../component/touromate-list/SupportTracker";
import SupportTicketsList from "../../component/touromate-list/SupportTicketsList";
import img from "../../assets/img/faq-img-2.png";
import SupportNowModal from "../../component/touromate-list/SupportNowModal";
import useMenu from "../../hooks/useMenu";
import SearchBar from "../../component/user/SearchBar";

function TouromateList() {
  const [supportNow, setSupportNow] = useState(false);
  useMenu();
  return (
    <Layout>
      <SupportNowModal
        isOpen={supportNow}
        handleClose={() => setSupportNow(false)}
      />
      <BreadCrumb title="여행친구찾기 목록" link="/touromate-list" />
      <Wrapper>
        <div className="container-fluid p-0">
          <div className="row crancy-gap-30">
            <div className="col-xxl-3 col-lg-4 col-12">
              <div className="row">
                <div className="col-12"></div>
              </div>
            </div>
            <SupportTicketsList />
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
}

export default TouromateList;
