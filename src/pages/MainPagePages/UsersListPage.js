import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GridLoader } from "react-spinners";

import Header from "../../custom/Components/header";
import Footer from "../../custom/Components/footer";
import DisplayUsersList from "./UsersListPageComponents/DisplayUsersList";
import "../../styles/UsersListPage.css";

export default function UsersListPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [boolean, setBoolean] = useState(false);
  const [displayUsersListLoading, setDisplayUsersListLoading] = useState(false);
  const [displayUsersListLoading2, setDisplayUsersListLoading2] = useState(true);

  useEffect(() => {
    if (!displayUsersListLoading && !displayUsersListLoading2) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [displayUsersListLoading, displayUsersListLoading2]);

  const goToMainPage = () => {
    navigate("/mainPage");
  };
  return (
    <div className={!loading ? null : "disable-events "}>
      {!loading ? null : (
        <GridLoader className="loader" color="#1D566B" size={30} />
      )}
      <div className={!loading ? null : "opacity-container"}>
        <div className="users__list--content-div">
            <Header></Header>
          <main className="main__section--UsersListPage ">
            <DisplayUsersList
              setDisplayUsersListLoading={setDisplayUsersListLoading}
              setDisplayUsersListLoading2={setDisplayUsersListLoading2}
              boolean={boolean}
              setBoolean={setBoolean}
            />

          </main>
            <Footer></Footer>
        </div>
      </div>
    </div>
  );
}
