import React, { useRef } from "react";
import Modal from "react-modal";
import Carousel from "react-multi-carousel";
import Events from "../hooks/events";
import {CgCloseO} from 'react-icons/cg'
import {AiFillStar} from 'react-icons/ai'
import "react-multi-carousel/lib/styles.css";
import {monthLong} from "../utils/constants";
function ModalComponent({ posts, dates, isOpen, setOpen, width, cardIndex }) {
  const sliderRef = useRef(null);
  const trunc = (line) => {
    return line.length > 70 ? `${line.substring(0, 70)}...` : line;
  };
  function afterOpen() {
    sliderRef.current.goTo(cardIndex, true)
  }
  function Close() {
    setOpen((val) => !val);
  }
  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={Close} onAfterOpen={afterOpen} className="top-0 left-0 right-auto bottom-auto bg-transparent border-none w-full h-full">
        <button
          className="border-none bg-transparent absolute top-4 right-11"
          style={{ fontSize: "40px" }}
        >
          <CgCloseO color={'#FFFFFF'} />
        </button>
        <br />
        <br />
        <br />
        <div
          className="overflow-hidden relative right-5 m-auto h-600px"
          style={{ height: "600px", width: width > 800 ? "500px" : "100%" }}
        >
          <Carousel
            swipeable={true}
            draggable={false}
            centerMode={true}
            sliderClass="60px"
            focusOnSelect={true}
            arrows={width > 800 ? true : false}
            transitionDuration={500}
            ref={sliderRef}
          >
            {posts &&
              posts.map((post, index) => 
                <div className="max-w-md" key={index}>
                  <div className="w-full h-550px bg-white border-5">
                    <img src={post.media[0].mediaurl} alt=''/>
                    <div className="m-auto p-1.5 relative box-border w-11/12">
                      <div className="w-full flex justify-between">
                        <div>
                          {post?.typeofday?.map((item) => (
                            <>
                              <Events e={item} />
                              &nbsp;
                            </>
                          ))}
                        </div>
                        <div className="text-base">
                          {[...new Array(5)].map((item, idx) => {
                            if (idx < post.rating)
                              return <AiFillStar color={"#9DD0EB"} />; 
                            else return <AiFillStar color={"#D2D4D8"} />; 
                          })}
                        </div>
                      </div>
                      <div className="h-25">
                        <h3 className="h-2.5">
                          {dates && dates[index] && dates[index].getDate()}{" "}
                          {dates &&
                            dates[index] &&
                            monthLong[dates[index].getMonth()]}
                        </h3>
                        {trunc(post.text)}
                      </div>
                      <br />
                      <div className="w-full m-auto pt-1 h-6 border-t-black border-t border-solid text-center absolute -bottom-3 text-xl font-bold left-0">
                        View Full Post
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </Carousel>
        </div>
      </Modal>
    </>
  );
}
export default ModalComponent;
