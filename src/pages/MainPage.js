import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../images/menu.png";
import image2 from "../images/users.png";
import image3 from "../images/month.png";

import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

import { useAuth } from "../AuthContext";

import { GridLoader } from "react-spinners";
import PageHeader from "../custom/Components/header";
import PageFooter from "../custom/Components/footer";
import MenuMoneyCC from "./MainPageCustomComponents/menuMoneyCC";
import UsersListCC from "./MainPageCustomComponents/usersListCC";
import MonthReportCC from "./MainPageCustomComponents/monthReportCC";
import "../styles/MainPage.css";



function MainPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [MM_CC_GetMeals_Loading, Set_MM_CC_GetMeals_Loading] = useState(true);
  const [UL_CC_GetEatNumber_Loading, Set_UL_CC_GetEatNumber_Loading] = useState(
    true
  );
  const { userSingOut, currentUser } = useAuth();

  useEffect(() => {
    if (!MM_CC_GetMeals_Loading && !UL_CC_GetEatNumber_Loading) {
      setLoading(false);
    } else setLoading(true);
  }, [MM_CC_GetMeals_Loading, UL_CC_GetEatNumber_Loading]);

  const goToMenuMoneyPage = () => {
    navigate("/menuMoneyPage");
  };
  const goToMonthReport = () => {
    navigate("/monthReport");
  };
  const goToUsersList = () => {
    navigate("/usersListPage");
  };

  return (
    <div className={!loading ? null : "disable-events"}>
      {!loading ? null : (
        <GridLoader className="loader" color="#1D566B" size={30} />
      )}
      <div
        className={
          !loading
            ? "main-main-content-div"
            : "main-main-content-div opacity-container"
        }
      >
        <PageHeader />

        <main className="main__section--MainPage">
          <div className="single__box">
            <div onClick={goToMenuMoneyPage}>
              <div className="menu__money--div main__section--divs single__box--child">
                <MenuMoneyCC
                  className="single__box--child"
                  Set_MM_CC_GetMeals_Loading={Set_MM_CC_GetMeals_Loading}
                />
                <img className="menu-img" src={image1} alt="55" />
              </div>
            </div>
          </div>
          <div className="dual__boxes--display-flex">
            <div className="dual__boxes--first-box">
              <div onClick={goToMonthReport}>
                {" "}
                <div className="one__more--div main__section--divs">
                  <MonthReportCC />{" "}
                  <img className="month-img" src={image3} alt="55" />
                </div>
              </div>
            </div>
            <div className="dual__boxes--second-box">
              <div onClick={goToUsersList}>
                <div className="users__list--div main__section--divs">
                  <UsersListCC
                    Set_UL_CC_GetEatNumber_Loading={
                      Set_UL_CC_GetEatNumber_Loading
                    }
                  />
                  <img className="users-img" src={image2} alt="55" />
                </div>
              </div>
            </div>
          </div>
        </main>

        <PageFooter />
      </div>
    </div>
  );
}

export default MainPage;
