import React, { useState } from "react";
import Calendar from "./components/Calendar";
import BottomNavigator from "./components/bottomNavigator";
import Header from "./components/header";
import { PlusCircleIcon } from "@heroicons/react/outline";
import "./styles/output.css";
function App() {
  const [currMonth, setCurrMonth] = useState(0);
  const [currYear, setCurrYear] = useState(0);
  return (
    <div>
      <Header currMonth={currMonth} currYear={currYear} />
      <Calendar
        currMonth={currMonth}
        setCurrMonth={setCurrMonth}
        setCurrYear={setCurrYear}
      />
      <BottomNavigator />
      <button
        style={{
          display:'flex',
          position: "absolute",
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          textAlign: "center",
          fontSize:'40px',
          bottom: "80px",
          right:'20px',
          border:'none',
          background:'#66d8fd',
          alignItems:'center',
          color:'white !important'

        }}
      >
        <PlusCircleIcon />
      </button>
    </div>
  );
}

export default App;
