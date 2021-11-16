import React, {Component} from 'react';
import Form from "react-bootstrap/Form";

// page to ask start date and the end data
class StartPage extends Component {
  render(){
    return (
      <div>
        <div className={"row"}>
          <h1 className={"display-1"}>Welcome to <i>TripWithMe</i></h1>
        </div>
        <div className={"row"}>
          <div className={"col-6"}>
            <Form.Control type="date" name='start_date' />
          </div>
          <div className={"col-6"}>
            <Form.Control type="date" name='end_date' />
          </div>
        </div>
      </div>
    );
  }
}

export default StartPage;
