import React from 'react';


const LetterSquare=(props)=>
     
    {

        return (
            <div >
            <svg  width={props.side} height={props.side}>
              <rect
                width={props.side}
                height={props.side}
                stroke="black"
                strokeWidth="4"
                fill="silver"
              />
              <text
                fill="#000000"
                fontSize="30"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontFamily="Verdana"
                x={props.side/2}
                y={props.side/2}
              >
                {props.letter}
              </text>
  
            </svg>
           
             </div>
        );
      }

      export default LetterSquare ;


 