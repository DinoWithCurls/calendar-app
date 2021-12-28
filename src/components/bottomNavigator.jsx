import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { ImCalendar } from "react-icons/im";
import { RiAccountCircleLine } from "react-icons/ri";

function BottomNavigator() {
  return (
    <div
      style={{
        position: "absolute",
        height: "6vh",
        fontSize: "30px",
        width: "100%",
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        background: 'white'
      }}
    >
        <AiOutlineHome />
        <BsSearch />
        <GrAddCircle />
        <ImCalendar color={"#66D8FD"} />
        <RiAccountCircleLine />
    </div>
  );
}

export default BottomNavigator;
