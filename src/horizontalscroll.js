import React from 'react'
import {ScrollMenu, VisibilityContext} from "react-horizontal-scrolling-menu";


const getItems = () =>{
    return Array(14)
        .fill(0)
        .map((_, ind) => ({
                id: `(fixme replace with actual date) day-${ind}`}
        ))
};

function Scroll() {
    const [items, setItems] = React.useState(getItems);
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
            // LeftArrow={LeftArrow}
            // RightArrow={RightArrow}
        >
            {items.map(({ id }) => (
                <Card
                    itemId={id} // NOTE: itemId is required for track items
                    title={id}
                    key={id}
                    attraction={MapContainer.state.names ? '' : MapContainer.state.names[0]}
                    onClick={handleClick(id)}
                    selected={isItemSelected(id)}
                />)
            )}

        </ScrollMenu>
    );
}

// function LeftArrow() {
//     const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext)
//
//     return (
//         <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
//             Left
//         </Arrow>
//     );
// }
//
// function RightArrow() {
//     const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext)
//
//     return (
//         <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
//             Right
//         </Arrow>
//     );
// }

function Card({
                  onClick,
                  title,
                  attraction,
              }) {
    const visibility = React.useContext(VisibilityContext)

    return (
        <div
            onClick={() => onClick(visibility)}
            style={{
                width: "260px",
                border: "1px solid",
            }}
            tabIndex={0}
        >
            <div className="card">
                <div>{title}</div>
                <div>attraction: {attraction}</div>

            </div>
            <div
                style={{
                    height: "200px",
                }}
            />
        </div>
    );
}
