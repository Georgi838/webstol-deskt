import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import app from "../../../custom/firebase";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDoc,
  getDocs,
} from "firebase/firestore";

import "../../../styles/menuForThisWeek.css";
import { useNavigate } from "react-router-dom";

const db = getFirestore(app);
const dbUsersUIDcollection = collection(db, "usersUID");
const dbMealsCollection = collection(db, "meals");
const dbInfoCollection = collection(db, "dbInfo");
const dayOfTheWeekInBG = [
  "Понеделник",
  "Вторник",
  "Сряда",
  "Четвъртък",
  "Петък",
];

export default function MenuForThisWeek({
  setMenuForThisWeek_loading,
  boolean,
}) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getMeals();
  }, [boolean]);

  const getMeals = async () => {
    setMenuForThisWeek_loading(true);
    await getDocs(dbMealsCollection).then((docsSnap) => {
      setMeals([]);
      docsSnap.forEach((doc) => {
        let updatedValue = doc.data();
        setMeals((meals) => [...meals, updatedValue]);
      });
    });
    setMenuForThisWeek_loading(false);
  };
  const navigate = useNavigate();
  const goToMainPage = () => {
    navigate("/mainPage");
  };
  return (
    <div>
      <div className="go__back-div">
      <IconButton className="arrow-back back-icon" aria-label="delete" size="small" onClick={goToMainPage}>
            <ArrowBackIcon />
          </IconButton>
        <h3 className="week__title">Тази седмица </h3>
        <div></div>
      </div>
      <div className="main-div-menuThisWeek">
        {meals.map((element) => (
          <div key={element.dayOfTheWeek}>
            <div className="label-content-two">
              <p className="para">{dayOfTheWeekInBG[element.indexKey]}</p>
            </div>
            <h3>Първо - {element.firstMeal}</h3>
            <h3>Второ - {element.secondMeal}</h3>
            <h3>Трето - {element.thirdMeal}</h3>
            <h3 className="cena">Цена - {element.price.toFixed(2)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
