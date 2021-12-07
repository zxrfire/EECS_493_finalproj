import React, {Component} from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';


class TimePickerComponent extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     value: new Date(),
        // };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = time => {
        if (this.props.setAttractionTime) {
            this.props.setAttractionTime(this.props.dayID, this.props.placeIndex, time);
        }
    };

    displayingTime = () => {
        if (this.props.displayTime != null){
            return this.props.displayTime;
        } else {
            return undefined;
        }
    };



    render() {
        // const time = this.state.value;
        return (
            <div style={{"width": "50px"}}>

            <TimePicker
                style={{ width: "50px"}}
                showSecond={true}
                value={this.displayingTime()}
                placeholder={"--:--"}
                className="xxx"
                // popupStyle={{"width":"100%"}}
                // clearIcon={null}
                allowEmpty={false}
                // disabledSeconds={}
                hideDisabledOptions={true}
                onChange={this.handleChange}
                onClose={this.props.newSortOrder}
                // use12Hours={true}
            />
            </div>
        );
    }
}

export default TimePickerComponent;