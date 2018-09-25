import React from "react";
import Hangman from './hangman'
 
import "../App.css";
import ImageLoader from 'react-load-image';
import Preloader from './preloader';



 
 


export default class FlyingPicture extends React.Component {
  render() {
    return (
        <div className="App-header">
   <ImageLoader 
    src={this.props.pic} 
  >
    <img className="small-pic" alt=""/>
    <div>Error!</div>
    <Preloader spinpic={this.props.spinpic}/>
  </ImageLoader>
         <Hangman handleChange={this.props.handleChange} word={this.props.word} gameState={this.props.gameState}/>
        

  </div>

    )}

}

