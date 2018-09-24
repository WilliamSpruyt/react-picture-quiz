import React from "react";
import spin from './spin.svg'
import "../App.css";

export default class Spinner extends React.Component  {
    render() {
      return (<div><img className='App-logo' src={spin}/></div>
           
      )
    }

    }
    /*<path stroke-width="5" d="M 50 50 Q 0 25 50 0 "/>
        <path stroke-width="5" d="M 50 50 Q 75 0 100 50 "/>
        <path stroke-width="5" d="M 50 50 Q 100 75 50 100 "/>
        <path stroke-width="5" d="M 50 50 Q 25 100 0 50 "/>*/