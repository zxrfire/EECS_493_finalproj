import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import DayCard from "./DayCard"
/*const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));*/

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));



function Scroll(props) {
  console.log(props.children[1]);
  //props.children[1] is an array of strings where each string is a location user searched for
  //props.children[1][0] = "eiffel-tower";
  const [items, setItems] = React.useState(props.children[1]);
  //setItems(props.children[1]);
  console.log(items);
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick = (id) => ({ getItemById, scrollToItem }) => {
    const itemSelected = isItemSelected(id)

    setSelected((currentSelected) =>
      itemSelected
        ? currentSelected.filter((el) => el !== id)
        : currentSelected.concat(id)
    );
  }

  return (
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
        >
          {items.map((id) => (
            
            <DayCard
              itemId={id} // NOTE: itemId is required for track items
              title={id}
              key={id}
              onClick={handleClick(id)}
              selected={isItemSelected(id)}
            />)
          )}

        </ScrollMenu>
  );
}

const Arrow = ({ text, className }) => {
    return (
      <div
        className={className}
      >{text}</div>
    );
  };

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      Left
    </Arrow>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
      Right
    </Arrow>
  );
}

// function Card({
//   onClick,
//   selected,
//   title,
//   itemId
// }) {
//   const visibility = React.useContext(VisibilityContext)
//
//   return (
//     <div
//       onClick={() => onClick(visibility)}
//       style={{
//         width: "160px",
//       }}
//       tabIndex={0}
//     >
//       <div className="card">
//         <div>{title}</div>
//         <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
//         <div>selected: {JSON.stringify(!!selected)}</div>
//       </div>
//       <div
//         style={{
//           height: "200px",
//         }}
//       />
//     </div>
//   );
// }

export default Scroll;