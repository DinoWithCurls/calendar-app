import React, { useState, useEffect } from "react";
import Events from "../hooks/events";
import {monthShort} from "../utils/constants";
import { StarIcon } from "@heroicons/react/solid";

function DateCard({ colIdx, rowIdx, style, isScrolling, data }) {
  const {
    setOpen,
    setCurrMonth,
    setCurrYear,
    currMonth,
    posts,
    dates,
    setCardIndex,
  } = data;
  const [disp, setDisp] = useState(false);
  const [imgIdx, setImgIdx] = useState(null);
  const onClick = (e) => {
    setCardIndex(imgIdx);
    setOpen((val) => !val);
  };

  useEffect(() => {
    const current = new Date(0);
    current.setDate(current.getDate() + (rowIdx - 1) * 7 + colIdx + 3);
    if (current.getMonth() === 0) {
      setCurrMonth(11);
      setCurrYear(current.getFullYear() - 1);
    } else {
      setCurrMonth(current.getMonth() - 1);
      setCurrYear(current.getFullYear());
    }
    let filteredDates = dates.filter((date, index) => {
      if (
        current.getMonth() === date.getMonth() &&
        current.getDate() === date.getDate() &&
        current.getFullYear() === date.getFullYear()
      ) {
        setImgIdx(index);
        return true;
      }
      return false
    });
    if (filteredDates.length) {
      setDisp(Boolean(filteredDates.length));
    }
  }, [rowIdx, colIdx, dates, setCurrMonth, setCurrYear]);
  const current = new Date(0);
  current.setDate(current.getDate() + (rowIdx - 1) * 7 + colIdx + 3);
  const weekend = new Date(current);
  weekend.setDate(weekend.getDate() + 6);
  return (
    <div
      className="flex flex-col justify-start items-center text-center relative text-sm border-solid border-slate-300 border-1/5"
      style={{
        ...style,
        backgroundColor: colIdx === 0 ? "rgba(0,0,0,0.1)" : "transparent",
        fontWeight: current.getMonth() === currMonth ? 900 : 400,
      }}
    >
        {isScrolling ? (
            colIdx === 0 && current.getDate() === 1 ? (
                <>
                    <span className="bg-white absolute top-px">
                        <b>{monthShort[current.getMonth()]} {current.getFullYear()}</b>
                    </span>
                    {current.getDate()}
                </>
            ) : colIdx === 0 && current.getDate() > weekend.getDate() && (current.getMonth() < weekend.getMonth() || (current.getMonth()=== 11 && current.getMonth() > weekend.getMonth())) ? (
                <>
                    <span className="bg-white absolute top-px">
                        <b>
                            {current.getMonth()===11 ? `${monthShort[(current.getMonth() + 1) % 12]} ${current.getFullYear() + 1}` : `${monthShort[(current.getMonth()+1)%12]} ${current.getFullYear()}`}
                        </b>
                    </span>
                    {current.getDate()}
                </>
            ) : (
                current.getDate()
            )
        ) : (
            current.getDate()
        )
    }
    {
        disp && imgIdx!== null && (
            <div className="mt-1.5 flex flex-col justify-around items-center w-full md:mt-0 md:h-4/5" onClick={onClick}>
                <div className="text-sm md:text-xs">
                    {[...new Array(5)].map((e, idx) => {
                        if(idx<posts[imgIdx].rating) {
                            return <StarIcon color="#9DD0EB" />
                        } else {
                            return <StarIcon color='#D2D4D8' />
                        }
                    })}
                </div>
                <img className="w-2/5 h-4/6 lg:w-4/5 md:w-full" src={posts[imgIdx].media[0].mediaurl} alt='' />
                <div className="flex">
                    {posts[imgIdx].typeofday.map(item=>(
                        <Events e={item} />
                    ))}
                </div>
            </div>
        )
    }
    </div>
  );
}
export default DateCard;