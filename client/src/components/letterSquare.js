import React from 'react';
  

export default class LetterSquare extends React.Component {
     
    render() {

        return (
            <div onClick={this.clickHandler}>
            <svg  width={this.props.side} height={this.props.side}>
              <rect
                width={this.props.side}
                height={this.props.side}
                
                strokeWidth="4"
                fill="silver"
              />
              <text
                fill="#000000"
                fontSize="30"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontFamily="Verdana"
                x={this.props.side/2}
                y={this.props.side/2}
              >
                {this.props.letter}
              </text>
  
            </svg>
           
             </div>
        );
      }



}
 