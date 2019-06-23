import React from 'react';


const DroppedButton=(props)=>
     
    {

        return (
            <div >
            <svg width="50" height="50" >
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="gray"
              strokeWidth="4"
              fill= "black"
               
            />
            <text
              
              fontSize="20"
              textAnchor="middle"
              alignmentBaseline="middle"
              fontFamily="Verdana"
              x="25"
              y="25"
              stroke="gray"
              fill="white"
              
            >
              {props.letter}
            </text>
          </svg>
           
             </div>
        );
      }

      export default DroppedButton ;


 