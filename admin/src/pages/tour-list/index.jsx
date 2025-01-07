import React, { useState } from "react";
import Layout from "../../component/home-two/Layout";
import BreadCrumb from "../../component/home-two/BreadCrumb";
import Wrapper from "../../component/tour-list/Wrapper";
import SupportHistoryCard from "../../component/cards/SupportHistoryCard";
import SupportTracker from "../../component/tour-list/SupportTracker";
import SupportTicketsList from "../../component/tour-list/SupportTicketsList";
import img from "../../assets/img/faq-img-2.png";
import SupportNowModal from "../../component/tour-list/SupportNowModal";
import useMenu from "../../hooks/useMenu";
import SearchBar from "../../component/user/SearchBar";

function TourList() {
  const [supportNow, setSupportNow] = useState(false);
  
  useMenu();
  return (
    <Layout>
      <SupportNowModal
        isOpen={supportNow}
        handleClose={() => setSupportNow(false)}
      />
      <BreadCrumb title="여행지 목록" link="/tour-list" />
      <Wrapper>
      <div className="container-fluid p-0">
          <div className="row crancy-gap-30">
            <div className="col-xxl-3 col-lg-4 col-12">
              <div className="row">
                <div className="col-12">
                </div>
              </div>
            </div>
            <SupportTicketsList />
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
}

export default TourList;
