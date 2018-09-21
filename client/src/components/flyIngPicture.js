import React from "react";
import Hangman from './hangman'
import Spinner from './spinner'
import "../App.css";



export default class FlyingPicture extends React.Component {
  render() {
    return (
        <div className="App-header">
  { this.props.pic && <img src={this.props.pic} className='small-pic' alt="logo" /> }
  { !this.props.pic &&<Spinner pic={this.props.spinpic}/>}
         <Hangman handleChange={this.props.handleChange} word={this.props.word} gameState={this.props.gameState}/>


  </div>

    )}

}


