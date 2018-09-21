import React from "react";
import { Row } from 'simple-flexbox';
 
import "../App.css";

export default class Hangman extends React.Component {
  
  render() {
    return (
        <div className="Hangman">
         <div><Row vertical='center' horizontal='spaced' >
      {this.props.gameState.map((ele,ind)=>{return (ele===1)?<div  key={ind.toString()} className="Hangman">{this.props.word[ind]}</div>:
      <input key={ind.toString()}
      onChange={(event)=>{this.props.handleChange(event.target.value,ind);}}
      value=""/>
      
      })}
      </Row></div></div>

   

    )}

}