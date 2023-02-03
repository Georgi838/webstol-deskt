import React, { useEffect, useState } from "react";
import "../../styles/usersListCC.css";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

import app from "../../custom/firebase";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore(app);
const dbUsersUIDcollection = collection(db, "usersUID");
const dbMealsCollection = collection(db, "meals");
const dbInfoCollection = collection(db, "dbInfo");

export default function UsersListCC({ Set_UL_CC_GetEatNumber_Loading }) {
  const navigate = useNavigate();
  const [eatNumberForTomorrow, setEatNumberForTomorrow] = useState();
  const [eatNumberForToday, serEatNumberForToday] = useState();

  function GetEatNumber() {
    const FuncInScope = async () => {
      let eatNumberLet = 0;
      const q = query(dbUsersUIDcollection, where("EatTrueFalse", "==", true));

      await getDocs(q).then((res) => {
        res.forEach(() => {
          eatNumberLet++;
        });
        setEatNumberForTomorrow(eatNumberLet);
      });

      const docRef = doc(dbInfoCollection, "eatTimesForToday");

      await getDoc(docRef).then((doc) => {
        serEatNumberForToday(doc.data().eatTimesForToday);
      });

      Set_UL_CC_GetEatNumber_Loading(false);
    };

    FuncInScope();

    return (
      <div className="tab__description-users">
        <p>
          Днес ще ядат - <span>{eatNumberForToday}</span>
        </p>
        <p>
          До момента утре ще ядат - <span>{eatNumberForTomorrow}</span>
        </p>
      </div>
    );
  }

  const goToUsersListPage = () => {
    navigate("/usersListPage");
  };

  return (
    <>
      <div className="tab__description-users">
        <GetEatNumber />
        <div className="btn-content">
          <button className="button" onClick={goToUsersListPage}>
            Към списъка
          </button>
        </div>
      </div>
    </>
  );
}
