import React from "react";
import "../../styles/header.css";
import logo from "../../images/logo.png";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../AuthContext";
export default function PageHeader() {
  const { userSingOut, currentUser } = useAuth();
  return (
    <header className="header">
      <div className="header__row">
        <img src={logo} alt="55" className="header__image" />
      </div>
      <div className="header__column">
        <h1 className="title text--gradient">W e b S t o l</h1>
        <h3 className="sub-title">ADMIN</h3>
      </div>
      {currentUser ? (
        <button className="logOut-btn" onClick={userSingOut}>
          Излез
        </button>
      ) : (
        <div className="no__user-div"></div>
      )}
    </header>
  );
}
