import React from "react";
 
import LetterSquare from "./letterSquare"
import "../App.css";

export default class Hangman extends React.Component {
  render() {
    return (
      <div className="Hangman">
        
          
            {this.props.gameState.map((ele, ind) => {
              return   (
                <div key={ind.toString()} className="Hangman">
                  <LetterSquare side={60}  letter={ele} />
                </div>
              )    
            })}
          
         
      </div>
    );
  }
}
