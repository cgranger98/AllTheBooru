import react,{ Component } from 'react'
import Front from './Components/Front.js'
import Check from './Components/Check.js'
import { render } from 'react-dom'
import './style.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link
} from "react-router-dom"

function App() {
  
  if(localStorage.getItem("validated")=="yes" || sessionStorage.getItem('validated')=='yes'){
    return (
        <Front></Front>
    )
  }else{
      return(
        <Check></Check>
      )
  }
  
}

export default App;
