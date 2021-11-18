import React, {Component} from 'react'
import {ScrollMenu, VisibilityContext} from "react-horizontal-scrolling-menu";


export default class Scroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            names: [],
            selected: [],
        };
        this.isItemSelected = this.isItemSelected.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getItems = this.getItems.bind(this);
        this.setSelected = this.setSelected.bind(this);
    }

    isItemSelected(id) {
        return !!this.state.selected.find((el) => el === id);
    }

    handleClick = (id) => ({ getItemById, scrollToItem }) => {
        const itemSelected = this.isItemSelected(id);
        this.setSelected(id, itemSelected);

        /*setSelected((currentSelected) =>
            itemSelected
                ? currentSelected.filter((el) => el !== id)
                : currentSelected.concat(id)
        );*/
    }

    setSelected(id, itemSelected) {
        let currentSelected = [];
        if (itemSelected) {
            currentSelected = this.state.selected.filter((el) => el !== id);
        }
        else {
            currentSelected = this.state.selected.concat(id);
        }
        this.setState({
            selected: currentSelected,
        });
    }

    getItems() {
        return Array(14)
            .fill(0)
            .map((_, ind) => ({
                    id: `(fixme replace with actual date) day-${ind}`}
            ))
    }

    componentDidMount() {
        this.setState({
            selected: this.getItems(),
        });
        
    }

    render() {
        let {items, names} = this.state;
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
                        attraction={names}
                        onClick={this.handleClick(id)}
                        selected={this.isItemSelected(id)}
                    />)
                )}
    
            </ScrollMenu>
        );
    }
}

/*export default function Scroll(props)  {

    const [items, setItems] = React.useState(getItems);
    const [names, setNames] = React.useState([])
    const [selected, setSelected] = React.useState([]);
    // const [position, setPosition] = React.useState(0);

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
                    attraction={names}
                    onClick={handleClick(id)}
                    selected={isItemSelected(id)}
                />)
            )}

        </ScrollMenu>
    );
}*/

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
