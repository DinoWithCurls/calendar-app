import React, { useEffect, useRef, useState } from "react";
import { FixedSizeGrid } from "react-window";
import ModalComponent from "./modal";
import DateCard from "./dateCard";
import useWindowSize from "../hooks/useWindowSize";
import {weekDays} from '../utils/constants'
const Calendar = ({ currMonth, setCurrMonth, setCurrYear }) => {
  let [screenWidth] = useWindowSize();
  const calendarRef = useRef(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [dates, setDates] = useState([]);
  useEffect(() => {
    fetch('https://api.quinn.care/graph', {
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          requestobjects: [
            {
              posts: {
                operationtype: 'read',
                id: {
                  return: true
                },
                userid: {
                  searchvalues: ['adbef521-7cf6-4344-af48-a9480df46549'],
                  return: true
                },
                iscalendarentry: {
                  searchvalues: ['true'],
                  return: true
                },
                media: {
                  return: true
                },
                rating: {
                  return: true
                },
                text: {
                  return: true
                },
                privacy: {
                  searchvalues: [18],
                  return: true
                },
                typeofday: {
                  return: true
                },
                calendardatetime: {
                  return: true,
                  sort: 'descending'
                },
                maxitemcount: 20,
                continuationtoken: null
              }
            }
          ]
        })
    }).then((res)=> res.json()).then((data) => {
        setPosts(data.responseobjects[0].posts);
        let arr = data.responseobjects[0].posts.map(
            data => new Date(data.calendardatetime)
        )
        setDates(arr);
    })
  }, []);
  useEffect(() => {
    let today = new Date();
    let dayOffset = today.getTimezoneOffset();
    let indianOffset = 330; //5.30 hrs * 60 mins
    let indianTime = new Date(
      today.getTime() + (indianOffset + dayOffset) * 60000
    );
    let weekOffset = Math.round(
      (indianTime - new Date(1970, 1, 4)) / (7 * 24 * 60 * 60 * 1000)
    );
    calendarRef.current.scrollToItem({
      columnIndex: 2,
      rowIndex: weekOffset + 7,
    });
  }, []);
  return (
    <>
      <ModalComponent
        width={screenWidth}
        isOpen={isOpen}
        setOpen={setOpen}
        cardIndex={cardIndex}
        posts={posts}
        dates={dates}
      />
      <div style={{ height: "83vh", width:'100%' }}>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width: '98.75%'}}>
          {weekDays.map((day, index) => 
            <div style={{height:'5vh', borderWidth:'0.2px', borderColor:'#E6E6E6', justifyContent:'center', display:'flex', flex:1, alignItems:'center', fontWeight:"bold"}} key={index}>
              {day}
            </div>
          )}
        </div>
        <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', overflowX:'hidden'}}>
          <FixedSizeGrid
            useIsScrolling
            ref={calendarRef}
            columnCount={7}
            columnWidth={screenWidth / 7.1}
            height={600}
            rowCount={10000}
            rowHeight={100}
            width={screenWidth}
            itemData={{
              setCurrMonth: setCurrMonth,
              setCurrYear: setCurrYear,
              currMonth: currMonth,
              posts: posts,
              dates: dates,
              setCardIndex: setCardIndex,
              setOpen: setOpen,
              otherData: true,
            }}
          >
            {DateCard}
          </FixedSizeGrid>
        </div>
      </div>
    </>
  );
};

export default Calendar;
