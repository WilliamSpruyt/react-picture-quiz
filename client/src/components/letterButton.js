import React from "react";

export default class LetterButton extends React.Component {
  constructor(props) {
    super(props);
     
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    this.setState({ isActive: false });
  }
  render() {
    return (
      <div
        onClick={
          (this.props.pressed.indexOf(this.props.letter)===-1)
            ? () => {
                this.props.handleLetterPress(this.props.letter);
                 
              }
            : null
        }
      >
        <svg width="50" height="50">
          <circle
            cx="25"
            cy="25"
            r={this.props.radius}
            stroke="none"
            strokeWidth="4"
            fill={(this.props.pressed.indexOf(this.props.letter)===-1) ? this.props.backColour : "silver"}
          />
          <text
            fill="#000000"
            fontSize="30"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontFamily="Verdana"
            x="25"
            y="25"
          >
            {this.props.letter}
          </text>
        </svg>
      </div>
    );
  }
}
