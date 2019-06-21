import React from 'react';
import "../App.css";
import LetterButton from "./letterButton"  ;
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
export default class Keyboard extends React.Component {


    render() {
        return(
            <div id="keyboard" className="Hangman">
        {this.props.alphabet.map((ele)=>{return  <LetterButton key={ele} newGame={this.props.newGame}  pressed={this.props.pressed }handleLetterPress={this.props.handleLetterPress} radius={30} letter={ele}  backColour={'purple'}/>})}
        
        </div>)
    }

}