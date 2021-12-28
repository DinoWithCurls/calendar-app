import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { monthShort } from "../utils/constants";

const Header = ({ currMonth, currYear }) => {
  return (
    <header
      style={{
        height: "6vh",
        boxSizing: "border-box",
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        fontSize: "28px",
        fontWeight: 700,
        paddingLeft: "5px",
      }}
    >
      <span>
        
        <span>
          <AiOutlineArrowLeft />
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span
          style={{
            color: "#66D8FD",
          }}
        >
          My
        </span>{" "}
        Hair Diary
      </span>
      <span className="font-normal">
        <b>{monthShort[monthShort.indexOf(currMonth)]}</b> {currYear}
      </span>
    </header>
  );
};

export default Header;
