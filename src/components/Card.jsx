import React from 'react';
import {VisibilityContext} from 'react-horizontal-scrolling-menu';

function Card(props) {
  const visibility = React.useContext(VisibilityContext);
  const { day } = props;
  return (
      <div
          // onClick={() => onClick(visibility)}
          style={{
            width: "160px",
          }}
          tabIndex={0}
      >
        <Card>
          <div className={"title"}>{day.date}</div>
        </Card>
        <div
            style={{
              height: "200px",
            }}
        />
      </div>
  );
}

export default Card;