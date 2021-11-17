import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import StartPage from './components/StartPage'

function App() {
  return (
      <BrowserRouter>
        <div className="App">
            <Routes>
              <Route path="/" element={<StartPage></StartPage>}>
              </Route>
            </Routes>
        </div>

      </BrowserRouter>
  );
}

export default App;
