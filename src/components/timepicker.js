import React, {Component} from 'react';
import TimePicker from 'react-time-picker';

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

class TimePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = time => {
        this.setState({
            value: time
        }, () => {
            if (this.props.setAttractionTime) {
                this.props.setAttractionTime(this.props.dayID, this.props.placeIndex, time);
            }
        });
    };
    render() {
        const time = this.state.value;
        return (
            <TimePicker
                onChange={this.handleChange}
                value={time}
                disableClock={true}
                hourPlaceholder="hh"
                minutePlaceholder="mm"
            />
        );
    }
}

export default TimePickerComponent;