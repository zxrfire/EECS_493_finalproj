import React, {useRef, useState} from 'react';
import DayCard from './DayCard';
import '../style/MapContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import useSmoothScroll from 'react-smooth-scroll-hook';
import { useScrollWatch } from 'react-smooth-scroll-hook';
import gsap from "gsap";

const DayCards = props =>{

  let ref = useRef(null);
  // const [scrollX, setscrollX] = useState(0);
  // const [scrolEnd, setscrolEnd] = useState(false);

  //Slide click
  // const slide = (shift) => {
  //   ref.current.scrollLeft += shift;
  //   setscrollX(scrollX + shift);
  //
  //   if (
  //       Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
  //       ref.current.offsetWidth
  //   ) {
  //     setscrolEnd(true);
  //   } else {
  //     setscrolEnd(false);
  //   }
  // };

  const { scrollTop, curIndex, curItem } = useScrollWatch({
    ref: ref,
    list: props.days.map((_, idx) =>
    {
      return {href: `#Day-${idx}`};
    }),
    offset: -10,
  });

  const { scrollTo, reachedTop,
    reachedBottom,
    containerSize
  } = useSmoothScroll({
    ref: ref,
    speed: 50,
    direction: 'x',
  });


  const renderDayCard = (day, id) => {
    return (
        <div className="col-3" id={`Day-${id}`} key={id} >
          <DayCard day={day}
                   key={id} dayID={id}
                   newPlace={props.handleNewAttraction}
                   deletePlace={props.deleteAttraction}
                   clearPlaces={props.clearAttractions}
                   getMarkersLatLng={props.getMarkersLatLng}
                   toggleMarkers={props.toggleDisplayMarkers}
                   setAttractionTime={props.setAttractionTime}
          >
          </DayCard>
        </div>
    );
  };

  // document.getElementById('left-button').onclick = function () {
  //
  // };
  //
  // document.getElementById('right-button').onclick = function () {
  //   scrollLeft(document.getElementById('days'), 300, 1000);
  // };

  const scrollLeft = (change, duration) => {
    let start = ref.current.scrollLeft,
        currentTime = 0,
        increment = 20;
    // if (change < 0){
    //   increment *= -1;
    // }

    console.log(start);
    let shouldEnd = null;
    if (change > 0){
      shouldEnd = () => reachedBottom;
    } else {
      shouldEnd = () => reachedTop;
    }

    let animateScroll = function(){
      currentTime += increment;
      let val = Math.easeInOutQuad(currentTime, start, change, duration);
      ref.current.scrollLeft = val;
      if(currentTime < duration && !shouldEnd()) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };

//t = current time
//b = start value
//c = change in value
//d = duration
  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };

  // const { days } = props;
    return (
          <div className={"wrapper-wrapper"}>
            <button className="scroll-btn"
                    onClick={() => {
                      scrollLeft(-900, 40);
                    }}
            >
              <span className="oi oi-chevron-left"></span>
            </button>
            <div className="scrolling-wrapper" ref={ref} id={"days"}>
            {props.days.map(
                (day, id) => renderDayCard(day, id))}
              </div>
            <button className="scroll-btn"
                    onClick={() =>
                    {
                      scrollLeft(900, 40);
                    }
                    }
            >
              <span className="oi oi-chevron-right"></span>
            </button>
          </div>
    );


};

export default DayCards;