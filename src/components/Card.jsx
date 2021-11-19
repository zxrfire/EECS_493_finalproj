import React from 'react';
import {VisibilityContext} from 'react-horizontal-scrolling-menu';

function Card({
                onClick,
                selected,
                title,
                itemId
              }) {
  const visibility = React.useContext(VisibilityContext);

  return (
      <div
          onClick={() => onClick(visibility)}
          style={{
            width: "160px",
          }}
          tabIndex={0}
      >
        <div className="card">
          <div>{title}</div>
          <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
          <div>selected: {JSON.stringify(!!selected)}</div>
        </div>
        <div
            style={{
              height: "200px",
            }}
        />
      </div>
  );
}

export default Card;