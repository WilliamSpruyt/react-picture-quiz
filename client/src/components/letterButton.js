import React from "react";
import '../App.css'
export default class LetterButton extends React.Component {
  constructor(props) {
    super(props);
     this.state={clicked:false}
  
  }
   
  render() {
    return (
      <div className={(this.state.clicked)?((this.props.word.indexOf(this.props.letter)===-1)?"buttonDrop":"buttonFly"):null}
        onClick={()=>{
            console.log(this.props.word)
           this.setState({clicked:true})
           setTimeout(()=>{this.setState({clicked:false});this.props.handleLetterPress(this.props.letter)}
           ,200)
                
                 
             
        }}
      >
        <svg width="50" height="50" >
          <circle
            cx="25"
            cy="25"
            r={this.props.radius}
            stroke="none"
            strokeWidth="4"
            fill={(!this.state.clicked) ? this.props.backColour : "gray"}
             
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
