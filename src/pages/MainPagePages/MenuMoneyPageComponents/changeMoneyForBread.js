import React, { useState, useEffect } from "react";
import "../../../styles/changeMoneyForBread.css";
import app from "../../../custom/firebase";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDoc,
  getDocs,
} from "firebase/firestore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const db = getFirestore(app);
const dbUsersUIDcollection = collection(db, "usersUID");
const dbMealsCollection = collection(db, "meals");
const dbInfoCollection = collection(db, "dbInfo");

export default function ChangeMoneyForBread({ setPriceForBread_loading }) {
  const [priceForBread, setPriceForBread] = useState();
  const [priceForBreadNew, setPriceForBreadNew] = useState("");
  const [breadPackages, setBreadPackages] = useState();
  const [breadPackagesNew, setBreadPackagesNew] = useState("");
  const [newPrice_loading, setNewPrice_loading] = useState(false);

  useEffect(() => {
    console.log(typeof priceForBreadNew);
    getPrice();
  }, [newPrice_loading]);

  const getPrice = () => {
    const docRef = doc(dbInfoCollection, "price");

    getDoc(docRef).then((res) => {
      setPriceForBread(res.data().breadPrice);
      setBreadPackages(res.data().breadPackagesForToday);
      setPriceForBread_loading(false);
    });
  };

  const SetNewPriceForBread = () => {
    if (priceForBreadNew === "") return;
    setPriceForBread_loading(true);

    const docRef = doc(dbInfoCollection, "price");

    updateDoc(docRef, {
      breadPrice: Number(priceForBreadNew),
    }).then(() => {
      setNewPrice_loading(!newPrice_loading);
      setPriceForBreadNew("");
      setPriceForBread_loading(false);
    });
  };

  const SetNewBreadPackages = () => {
    if (breadPackagesNew === "") return;
    setPriceForBread_loading(true);

    const docRef = doc(dbInfoCollection, "price");

    updateDoc(docRef, {
      breadPackagesForToday: Number(breadPackagesNew),
    }).then(() => {
      setNewPrice_loading(!newPrice_loading);
      setBreadPackagesNew("");
      setPriceForBread_loading(false);
    });
  };

  const navigate = useNavigate();
  const goToMainPage = () => {
    navigate("/mainPage");
  };

  return (
    <>
      {/* <div className="go__back-div-two">
        <div className="back-icon-div">
          <button className="back-icon" onClick={goToMainPage}>
            <IconButton
              className="arrow-back "
              aria-label="delete"
              size="small"
            >
              <ArrowBackIcon />
            </IconButton>
          </button>
          <div className="go__back-div-two-message">Върни назад</div>
        </div>
      </div> */}
      <div className="bread-money">
        <div className="price">
          <p>Цена на хляба - {priceForBread}</p>
          <div className="column-bread">
            <input
              type="number"
              value={priceForBreadNew}
              onChange={(e) => setPriceForBreadNew(e.target.value)}
            ></input>
            <button onClick={SetNewPriceForBread}>Запази</button>
          </div>
        </div>
        <div className="packages">
          <p>Брой - {breadPackages}</p>
          <div className="column-bread">
            <input
              type="number"
              value={breadPackagesNew}
              onChange={(e) => setBreadPackagesNew(e.target.value)}
            ></input>
            <button onClick={SetNewBreadPackages}>Запази</button>
          </div>
        </div>
      </div>
    </>
  );
}
