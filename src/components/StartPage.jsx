import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from 'react-bootstrap';

// page to ask start date and the end data
class StartPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    start_date: null,
    end_date: null,
  };

  render(){
    return (
        // <div className="container">
        //   <div className="row vh-100 d-flex justify-content-md-center align-items-center">
        //     {/*<div className="col-md-12">*/}
        //       <div
        //           className="row text-center">
        //         <h1 className={"display-1"}>Welcome to TripWithMe</h1>
        //       </div>
        //     {/*</div>*/}
        //     {/*<div className="col-md-6">*/}
        //     {/*  <div*/}
        //     {/*      className="d-flex justify-content-md-center align-items-center vh-100">*/}
        //     {/*    <p>Content 2</p>*/}
        //     {/*  </div>*/}
        //     {/*</div>*/}
        //   </div>
        // </div>
        <div
            className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <h1 className={"display-1"}>Welcome to <i>TripWithMe</i></h1>
          <p>Please input the start and end date to start planning <i>your</i> trip!</p>
          <Form>

            <Row className={"mb-3 w-100"}>
                <Row>
                  <label htmlFor="inputStartDate">Start Date</label>
                  <input type="date" className="form-control" id="inputEmail4"
                         placeholder="Start Date" onInput={this.props.newStartDate}/>
                </Row>
                <Row>
                  <label htmlFor="inputStartDate">End Date</label>
                  <input type="date" className="form-control" id="inputPassword4"
                         placeholder="EndDate"/>
                </Row>
            </Row>
          </Form>
          <div className={"row mt-1 justify-content-center"}>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      // <Container className={"jumbotron justify-content-md-center row h-100"}>
      //   {/*Title*/}
      //   <div className={"d-flex "}>
      //
      //     <div className={"row"}>
      //       <h1 className={"display-1"}>Welcome to TripWithMe</h1>
      //     </div>
      //   </div>
      //   <div className="form-row justify-content-md-center">
      //     <div className="form-group col-md-6">
      //       <label htmlFor="inputStartDate">Start Date</label>
      //       <input type="date" className="form-control" id="inputEmail4"
      //              placeholder="Start Date"/>
      //     </div>
      //     <div className="form-group col-md-6">
      //       <label htmlFor="inputStartDate">End Date</label>
      //       <input type="date" className="form-control" id="inputPassword4"
      //              placeholder="EndDate"/>
      //     </div>
      //   </div>
      // </Container>
    );
  }
}

export default StartPage;
