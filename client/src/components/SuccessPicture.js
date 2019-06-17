import React, { Component } from "react";
import Hangman from './hangman'
import "../App.css";

export default class SuccessPicture extends React.Component {
  render() {
    return (
        <div className="Success">
          <img src={this.props.pic} className='small-pic' alt="logo" />
         


  </div>

    )}

}


