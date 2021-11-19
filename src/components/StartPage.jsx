import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Form from "react-bootstrap/Form";
import key from './../key'
import "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from 'react-bootstrap';
import Autocomplete from "react-google-autocomplete";
import DatePicker from "react-datepicker";

// page to ask start date and the end data
const StartPage = props => {

    return (
        <div
            className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <h1 className={"display-1"}>Welcome to <i>TripWithMe</i></h1>
          <p>Please input the start and end date to start planning <i>your</i> trip!</p>
          <Form>

            <Row className={"mb-3 w-100"}>
                <Row className={"mt-1"}>
                  <label htmlFor="inputStartDate">Start Date</label>
                  <input type="date" className="form-control" id="inputEmail4"
                         placeholder="Start Date" onInput={props.newStartDate}
                      onSet={props.newStartDate}/>
                </Row>
                <Row className={"mt-1"}>
                  <label htmlFor="inputStartDate">End Date</label>
                  <input type="date" className="form-control" id="inputPassword4"
                         placeholder="EndDate" onInput={props.newEndDate}
                  onSet={props.newEndDate}/>
                </Row>
                <Row className={"mt-1"}>
                  <label htmlFor="inputCity">Choose Your City</label>
                  <Autocomplete
                      apiKey={key}
                      style={{ width: "100%" }}
                      onPlaceSelected={(place) => {
                        console.log(place);
                        this.props.handleNewCity(place);
                      }}
                      options={{
                        types: ["(regions)"],
                      }}
                      defaultValue="Singapore"
                  />
                </Row>
            </Row>
          </Form>
          <div className={"row mt-1 justify-content-center"}>
            <Link to="/map" className="btn btn-primary" onClick={props.newTrip}>Get Started</Link>

          </div>
        </div>
    );
};

export default StartPage
