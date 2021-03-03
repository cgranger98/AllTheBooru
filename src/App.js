import Front from './Components/Front.js'
import Check from './Components/Check.js';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link
} from "react-router-dom";
import { render } from 'react-dom';

function App() {
  if(localStorage.getItem("validated")=="yes" || sessionStorage.getItem('validated')=='yes'){
    return (
      <div>
        <Front></Front>
      </div>
    )
  }else{
      return(
        <div><Check></Check></div>
      )
  }
}

export default App;
