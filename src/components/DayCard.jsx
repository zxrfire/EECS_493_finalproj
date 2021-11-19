import React from 'react';
import {VisibilityContext} from 'react-horizontal-scrolling-menu';
import {Card} from 'react-bootstrap';

const DayCard = (props) => {
  const visibility = React.useContext(VisibilityContext);
  const { day } = props;

  // const getCardTitle = ()=>{
    // retur
  // };

  return (
      // <Card.Title
      //     // onClick={() => onClick(visibility)}
      //     style={{
      //       width: "160px",
      //     }}
      //     tabIndex={0}
      // >
        <Card>
          <Card.Title>{day.date}</Card.Title>
        </Card>
        // <div
        //     style={{
        //       height: "200px",
        //     }}
        // />
      // </div>
  );
};

export default DayCard;