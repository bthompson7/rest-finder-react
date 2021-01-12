import logo from './logo.svg';
import './App.css';
import HomeRoute from './components/route';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
      <HomeRoute></HomeRoute>
      </Router>
    </div>
  );
}

export default App;
