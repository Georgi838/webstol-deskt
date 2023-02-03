import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import app from "../../custom/firebase";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDoc,
} from "firebase/firestore";
import { GridLoader } from "react-spinners";

import PageHeader from "../../custom/Components/header";
import PageFooter from "../../custom/Components/footer";
import MenuForThisWeek from "./MenuMoneyPageComponents/menuForThisWeek";
import MenuForNextWeek from "./MenuMoneyPageComponents/menuForNextWeek";
import ChangeMoneyForBread from "./MenuMoneyPageComponents/changeMoneyForBread";
import "../../styles/MenuMoneyPage.css";

const db = getFirestore(app);
const dbUsersUIDcollection = collection(db, "usersUID");
const dbMealsCollection = collection(db, "meals");
const dbInfoCollection = collection(db, "dbInfo");

export default function MenuMoneyPage() {
  const navigate = useNavigate();
  const [boolean, setBoolean] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuForThisWeek_loading, setMenuForThisWeek_loading] = useState(true);
  const [menuForNextWeek_loading, setMenuForNextWeek_loading] = useState(true);
  const [priceForBread_loading, setPriceForBread_loading] = useState(true);

  useEffect(() => {
    if (
      !menuForThisWeek_loading &&
      !menuForNextWeek_loading &&
      !priceForBread_loading
    ) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [menuForThisWeek_loading, menuForNextWeek_loading, priceForBread_loading]);

  return (
    <div className={!loading ? null : "disable-events "}>
      {!loading ? null : (
        <GridLoader className="loader" color="#1D566B" size={30} />
      )}
      <div className={!loading ? null : "opacity-container  "}>
        <div className="menu-money-content-div">
          <main className="main-section-MenuMoneyPage ">
            <PageHeader />
            <MenuForThisWeek
              setMenuForThisWeek_loading={setMenuForThisWeek_loading}
              boolean={boolean}
            />
            <MenuForNextWeek
              setMenuForNextWeek_loading={setMenuForNextWeek_loading}
              boolean={boolean}
              setBoolean={setBoolean}
            />
            <ChangeMoneyForBread
              setPriceForBread_loading={setPriceForBread_loading}
              boolean={boolean}
              setBoolean={setBoolean}
            />
            <PageFooter />
          </main>
        </div>
      </div>
    </div>
  );
}
