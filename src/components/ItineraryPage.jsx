import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from 'react-bootstrap';
import { useHistory } from 'react-router-dom'


// page to ask start date and the end data
const ItineraryPage = props => {


  return (
        <div
            className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <h1 className={"display-1"}>Test</h1>
          <p>Test <i>your</i> trip!</p>
          <Form>

            <Row className={"mb-3 w-100"}>
              <Row>
                <label htmlFor="inputStartDate">Start Date</label>
                {/*<input type="date" className="form-control" id="inputEmail4"*/}
                {/*       placeholder="Start Date" onInput={this.props.newStartDate}/>*/}
              </Row>
              <Row>
                <label htmlFor="inputStartDate">End Date</label>
                {/*<input type="date" className="form-control" id="inputPassword4"*/}
                {/*       placeholder="EndDate" onInput={this.props.newEndDate}/>*/}
              </Row>
            </Row>
          </Form>

        </div>

    );
};

export default ItineraryPage;