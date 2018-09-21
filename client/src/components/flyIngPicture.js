import React, { Component } from "react";
import Hangman from './hangman'
import "../App.css";

export default class FlyingPicture extends React.Component {
  render() {
    return (
        <div className="App-header">
          <img src={this.props.pic} className='small-pic' alt="logo" />
         <Hangman handleChange={this.props.handleChange} word={this.props.word} gameState={this.props.gameState}/>


  </div>

    )}

}


