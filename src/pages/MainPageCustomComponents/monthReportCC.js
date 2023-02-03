import React from "react";
import "../../styles/monthReportCC.css";
import { useNavigate } from "react-router-dom";

export default function MonthReportCC() {
  const navigate = useNavigate();

  const goToMonthReport = () => {
    navigate("/monthReport");
  };

  return (
    <div className="tab__description-month month-report">
      <a onClick={goToMonthReport}>
        <p>Месечни отчети, почивки</p>
        <div className="btn-content">
          <button className="button" onClick={goToMonthReport}>
            Към месеченият отчет
          </button>
        </div>
      </a>
    </div>
  );
}
