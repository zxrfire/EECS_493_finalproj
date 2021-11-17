import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import StartPage from './components/StartPage'
import Trip from './Trip'
import {Component} from 'react';

class App extends Component{
  constructor(props) {
    super(props);
    // initialise the state variables
    this.state = {
      startDate: null,
      endDate: null
    }
  };
  handleNewStartDate = (event) => {
      this.setState({startDate: event.target.value});
  };
  handleNewEndDate = (event) => {

  };
  render(){
    return (
        <BrowserRouter>
          <div className="App">
              <Routes>
                <Route path="/" element={
                  <StartPage newStartDate={this.handleNewStartDate}></StartPage>
                }>
                </Route>
              </Routes>
          </div>

        </BrowserRouter>
    );
  }
}

export default App;
