import React, {useRef, useState} from 'react';
import DayCard from './DayCard';
import '../style/MapContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import useSmoothScroll from 'react-smooth-scroll-hook';
import {useScrollWatch} from 'react-smooth-scroll-hook';
import {Accordion} from 'react-bootstrap';
import PlaceDetails from './PlaceDetails';
import gsap from 'gsap';

const DayCards = props => {

  let ref = useRef(null);

  const {scrollTop, curIndex, curItem} = useScrollWatch({
    ref: ref,
    list: props.days.map((_, idx) => {
      return {href: `#Day-${idx}`};
    }),
    offset: -10,
  });

  const {
    scrollTo, reachedTop,
    reachedBottom,
    containerSize,
  } = useSmoothScroll({
    ref: ref,
    speed: 50,
    direction: 'x',
  });

  const renderDayCard = (day, id) => {
    return (
        // <div className={'col-3'} id={`Day-${id}`} key={id}
        //      // style={{'margin-left': '0.1%', 'margin-right': '0.1%'}}
        // >
          <DayCard day={day}
                   key={id} dayID={id}
                   newPlace={props.handleNewAttraction}
                   newSortOrder={() => props.newSortOrder(id)}
                   newDropRecommendation={props.newDropRecommendation}
                   deletePlace={props.deleteAttraction}
                   clearPlaces={props.clearAttractions}
                   getMarkersLatLng={props.getMarkersLatLng}
                   toggleMarkers={props.toggleDisplayMarkers}
                   setAttractionTime={props.setAttractionTime}
                   usedDragDrop={props.usedDragDrop}
                   setUsedDragDrop={props.setUsedDragDrop}
          >
          </DayCard>

         // {/*</div>*/}
    );
  };

  const scrollLeft = (change, duration) => {
    let start = ref.current.scrollLeft,
        currentTime = 0,
        increment = 20;
    console.log(start);
    let shouldEnd = null;
    if (change > 0) {
      shouldEnd = () => reachedBottom;
    } else {
      shouldEnd = () => reachedTop;
    }

    let animateScroll = function() {
      currentTime += increment;
      let val = Math.easeInOutQuad(currentTime, start, change, duration);
      ref.current.scrollLeft = val;
      if (currentTime < duration && !shouldEnd()) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };

//t = current time
//b = start value
//c = change in value
//d = duration
  Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  // const { days } = props;
  return (
      <div className={'wrapper-wrapper'}>
        <button className="scroll-btn"
                onClick={() => {
                  scrollLeft(-900, 40);
                }}
        >
          <span className="oi oi-chevron-left"></span>
        </button>
        <div className="scrolling-wrapper" ref={ref} id={'days'}>
          {props.days.map(
              (day, id) => renderDayCard(day, id))}
        </div>
        <button className="scroll-btn"
                onClick={() => {
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