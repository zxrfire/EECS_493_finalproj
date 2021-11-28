import React, {Component} from 'react';
import TimePicker from 'rc-time-picker';
import ReactDOM from 'react-dom';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

/*function TimePickerComponent() {
    const [value, onChange] = useState('10:00');

    return (
        <TimePicker
            onChange={onChange}
            value={value}
            disableClock={true}
            hourPlaceholder="hh"
            minutePlaceholder="mm"
        />
    );
}*/
// import Clock from 'react-clock';

class TimePickerComponent extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     value: new Date(),
        // };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = time => {
        // this.setState({
        //     value: time
        // }, () => {
        //     if (this.props.setAttractionTime) {
        //         this.props.setAttractionTime(this.props.dayID, this.props.placeIndex, time);
        //     }
        // });
        console.log(time);
        if (this.props.setAttractionTime) {
            this.props.setAttractionTime(this.props.dayID, this.props.placeIndex, time);
        }
    };

    displayingTime = () => {
        if (this.props.displayTime != null){
            return this.props.displayTime;
        }
        return null;
    };


    render() {
        // const time = this.state.value;
        return (
            <div style={{"width": "48px"}}>

            <TimePicker
                style={{ padding: "0"}}
                showSecond={false}
                value={this.displayingTime()}
                className="xxx"
                clearIcon={null}
                allowEmpty={false}
                onChange={this.handleChange}
            />
            </div>
        );
    }
}

export default TimePickerComponent;