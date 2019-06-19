import React from "react";

 
import "../App.css";
import ImageLoader from 'react-load-image';
import Preloader from './preloader';



 
 


export default class FlyingPicture extends React.Component {
  render() {
    return (
      <div > 
   <ImageLoader 
    src={this.props.pic} 
     
  >
    <img  alt=""/>
    <div className={"guess"}>GUESS!</div>
    <Preloader spinpic={this.props.spinpic}/>
  </ImageLoader>
        
        

  </div> 

    )}

}

