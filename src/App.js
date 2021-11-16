import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import StartPage from './components/StartPage'

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/" element={<StartPage></StartPage>}>
              </Route>
            </Routes>
          </header>
        </div>

      </BrowserRouter>
  );
}

export default App;
