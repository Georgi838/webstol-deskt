import React, { useEffect, useState } from "react";

import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/menuMoneyCC.css";
import app from "../../custom/firebase";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDoc,
} from "firebase/firestore";

const db = getFirestore(app);
const dbUsersUIDcollection = collection(db, "usersUID");
const dbMealsCollection = collection(db, "meals");
const dbInfoCollection = collection(db, "dbInfo");

export default function MenuMoneyCC({
  Set_MM_CC_GetMeals_Loading,
  Set_MM_CC_GetPrice_Loading,
}) {
  const navigate = useNavigate();
  const { currentUser, _TIME } = useAuth();

  const [priceOneMeal, setPriceOneMeal] = useState();

  const [firstMeal, setFirstMeal] = useState();
  const [secondMeal, setSecondMeal] = useState();
  const [thirdMeal, setThirsMeal] = useState();

  const goToMenuMoneyPage = () => {
    navigate("/menuMoneyPage");
  };

  function GetMeals() {
    // console.log(_TIME)
    let docRef;
    _TIME >= 1 && _TIME < 6
      ? (docRef = doc(dbMealsCollection, `${_TIME}`))
      : (docRef = doc(dbMealsCollection, "1"));

    // docRef = doc(dbMealsCollection, "2");

    getDoc(docRef).then((res) => {
      setFirstMeal(res.data().firstMeal);
      setSecondMeal(res.data().secondMeal);
      setThirsMeal(res.data().thirdMeal);
      setPriceOneMeal(res.data().price);

      Set_MM_CC_GetMeals_Loading(false);
    });
    return (
      <div className="tab__description-menu">
        <div className="menu--display-flex">
          <div className="display-flex margin--left">
            <p>Първо - {firstMeal}</p>
            <p>Второ - {secondMeal}</p>
            <p>Трето - {thirdMeal}</p>
          </div>
          <div className="display-flex-two">
            <p>
              Цена за еденично ядене - <span>{priceOneMeal}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab__description-menu ">
      <GetMeals />
      <div className="btn-content">
        <button className="button margin--top" onClick={goToMenuMoneyPage}>
          Към менюто
        </button>
      </div>
    </div>
  );
}
