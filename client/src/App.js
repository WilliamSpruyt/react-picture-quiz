import React, { Component } from 'react';
import logo from './logo.svg';
import spinpic from './logo.svg'
import "whatwg-fetch";
import './App.css';
import FlyingPicture from './components/flyIngPicture';
import { Column, Row } from 'simple-flexbox';
const API_PORT = process.env.PORT;
//const url = "/api";	
const url = "http://localhost:3001/api";
 

 
 
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     weirdArray:[{pic:logo,word:'balls',gameState:[0]}],
     qNum:0,
     score:0
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
   // this.loadPicsFromServer();
   this.awaitPicsFromServer();
  }
  loadPicsFromServer = () => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch(url)
     .then(data => data.json())
      .then(res => {
        if (!res){ this.setState({ error: res.error });console.log(res);}
        else {var theScrapings=res.theScrapings.slice();
          theScrapings.forEach((ele)=>{ele.gameState=this.hangmanify(ele.word)})
          
          
          this.setState({ weirdArray: theScrapings })
         }
      });
  };
  awaitPicsFromServer = async () => {
    const response = await fetch(url)
    const res = await response.json()
    console.log(res.theScrapings)
    if (res.theScrapings.length<1){ this.setState({ error: res.error });console.log('bolls');}
    else {var theScrapings=res.theScrapings.slice();
      theScrapings.forEach((ele)=>{ele.gameState=this.hangmanify(ele.word)})
      
      
      this.setState({ weirdArray: theScrapings })
     }

  
  }

  
  hangmanify(word){
    
    let answer=[];
    let splitWord=word.split('');
    splitWord.forEach((ele)=>{answer.push((ele===" ")?'/':(Math.random()>0.5)?1:0)});
    return answer;
  }
  handleChange(value,ind){
    
    var wordArr=this.state.weirdArray[this.state.qNum].word.split('');
    
    var gameTempstate=this.state.weirdArray[this.state.qNum];
    
    if(value===wordArr[ind]){
      this.setState({score:this.state.score+1})
      gameTempstate.gameState[ind]=1;
     // if(this.state.qNum,this.state.weirdArray.length-1){console.log('shittage');this.awaitPicsFromServer()}
      console.log(this.state.qNum,this.state.weirdArray.length-1)
      this.setState({wierdArray:gameTempstate},
         ()=>{if (gameTempstate.gameState.reduce((accumulator, currentValue) => accumulator + currentValue)===gameTempstate.gameState.length)
          {(this.state.qNum===this.state.weirdArray.length-1)?this.setState({qNum:0},this.awaitPicsFromServer):this.setState({qNum:this.state.qNum+1})}}
        
        )
     
    }
    else{
      
      this.setState({score:this.state.score-1})
    }
      
  }
  render() {
    return (
      <div className="App">
      <Column horizontal='center'>
      <Row vertical='center' horizontal='spaced'  >
      <FlyingPicture spinpic={spinpic} handleChange={this.handleChange} gameState={this.state.weirdArray[this.state.qNum].gameState} word={this.state.weirdArray[this.state.qNum].word} pic={this.state.weirdArray[this.state.qNum].url}/>
      </Row><div className='score'>{this.state.score}</div></Column></div>
    );
  }
}

export default App;
