import { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Front from './Front.js'

class Check extends Component{
  render(){
    return (
      <div className="Check">
        <div style={{width:"60%",position:"absolute",top:"25%",left:"25%"}}>
            <p  style={{align:"justify"}}>Este sitio contiene contenido para adultos.<br/>
            Necesitas confirmar que eres mayor de 18 años para poder entrar.</p>
            <p>¿Eres mayor de 18 años?</p>
            
            <button id="btn1" className="btn btn-secondary" onClick={Redirect} >Si.</button>
            <a href="http://www.google.com/"><button id="btn2" className="btn btn-secondary ms-2" >No.</button></a>
        </div>
      </div>
    );
  } 
}

function Redirect(){
	CheckValidation("1");
  window.location='/';
}


function CheckValidation(n){
  const str = "Esta página utiliza almacenamiento local para que no tengas que repetir este paso. ¿Estas de acuerdo con esto?";
  
  if(localStorage.getItem("validated")=="yes"){
      window.location='main.html';
  }else{
      if(n==1&&window.confirm(str)){
          if (typeof(Storage) !== "undefined") {			
              // Retrieve
              //username=localStorage.getItem("username");
              // Store
              //localStorage.setItem("username", prompt('Enter your name'));
              localStorage.setItem("validated","yes")
              
          }else{
              console.log("Sorry! No Web Storage support..");
          }
      }else{
        sessionStorage.setItem('validated', 'yes');
              
      }
  }
  }

  export default Check;