import React, { Component } from "react";
import logo from "./logo.svg";
import spinpic from "./spin.svg";
import "whatwg-fetch";
import "./App.css";
import Success from "./pictures/welcome.jpg";
import SuccessPicture from "./components/SuccessPicture";
import Hangman from "./components/hangman";
import FlyingPicture from "./components/flyIngPicture";
import HangmanPic from "./components/hangmanPic";
import { Column, Row } from "simple-flexbox";
import { setTimeout } from "timers";
import Keyboard from "./components/keyboard";
const API_PORT = process.env.PORT;
const url = "/api";
//const url = "http://localhost:3001/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weirdArray: [{ pic: logo, word: "balls", gameState: [0] }],
      qNum: 0,
      score: 0,
      scoreClass: "score",
      height: 400,
      alphabet:[{letter:'a'},{letter:'b'},{letter:'c'},{letter:'d'},{letter:'e'},{letter:'f'},{letter:'g'},{letter:'h'},{letter:'i'},{letter:'j'},{letter:'k'},{letter:'l'},{letter:'m'},{letter:'n'},{letter:'o'},{letter:'p'},{letter:'q'},{letter:'r'},{letter:'s'},{letter:'t'},{letter:'u'},{letter:'v'},{letter:'w'},{letter:'x'},{letter:'y'},{letter:'z'}, ],
      pressed:[]
    };
     
    this.handleLetterPress = this.handleLetterPress.bind(this);
  }
  componentDidMount() {
    // this.loadPicsFromServer();
    this.awaitPicsFromServer();
    this.updateDimensions();
    
  }
  componentWillUnmount() {
    
  }
  loadPicsFromServer = () => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch(url)
      .then(data => data.json())
      .then(res => {
        if (!res) {
          this.setState({ error: res.error });
        } else {
          var theScrapings = res.theScrapings.slice();
          theScrapings.forEach(ele => {
            ele.gameState = this.hangmanify(ele.word);
          });

          this.setState({ weirdArray: theScrapings });
        }
      });
  };
  awaitPicsFromServer = async () => {
    const response = await fetch(url);
    const res = await response.json();

    if (res.theScrapings.length < 1) {
      this.setState({ error: res.error });
    } else {
      var theScrapings = res.theScrapings.slice();
      var httpsScrappings = theScrapings.filter(ele => {
        return ele.url.includes("https");
      });

      httpsScrappings.forEach(ele => {
        ele.gameState = this.hangmanify(ele.word);
      });
      this.setState({ weirdArray: httpsScrappings });
    }
  };

  awaitPicsFromServer = async () => {
    const response = await fetch(url);
    const res = await response.json();

    if (res.theScrapings.length < 1) {
      this.setState({ error: res.error });
    } else {
      var theScrapings = res.theScrapings.slice();
      if (theScrapings[0].word === "xylophone") {
        this.setState({ qNum: 0 }, this.awaitPicsFromServer);
      } else {
        theScrapings.forEach(ele => {
          ele.gameState = this.hangmanify(ele.word);
        });
        this.setState({ weirdArray: theScrapings });
      }
    }
  };
  updateDimensions() {
    let update_height = Math.round(window.innerHeight);
    this.setState({ height: update_height });
  }
  youLose = () => {
    alert("you lose");
    this.setState({ score: 0, qNum: 0 });
  };
  hangmanify(word) {
    let answer = [];
    let splitWord = word.split("");
    if (splitWord.length < 5) {
      splitWord.forEach(ele => {
        answer.push(" ");
      });
      return answer;
    }
    splitWord.forEach(ele => {
      answer.push(ele === " " ? "/" : Math.random() > 0.5 ? ele : " ");
    });
    return answer;
  }
  handleLetterPress(letter) {
    this.setState({pressed:this.state.pressed.concat(letter)})
    
    
    
    
    let found = false;
    var wordArr = this.state.weirdArray[this.state.qNum].word.split("");
     
    var gameTempstate = this.state.weirdArray[this.state.qNum];
     
    wordArr.forEach((ele, ind) => {
      if (ele === letter) {
        gameTempstate.gameState[ind] = ele;
        found = true;
      }
    });
     
    this.setState({ wierdArray: gameTempstate }, () => {
      if (gameTempstate.gameState.indexOf(" ") === -1) {
        
        this.state.qNum === this.state.weirdArray.length - 1
          ? this.setState({ qNum: 0 ,pressed:[]}, this.awaitPicsFromServer)
          : this.setState({ qNum: this.state.qNum + 1 ,pressed:[]});
      }
    });
    if (!found) {
      this.setState({
        score: this.state.score - 1,
        
      });
    }
    if (this.state.score < -13) {
      this.youLose();
    }
  }
  
 

  render() {
    return (
      <div className="App">
        <div className={"App-header"}>{"Round " + (this.state.qNum + 1)}</div>

        <div id="picAndWord">
          {" "}
          <div className={this.state.scoreClass}>
            <HangmanPic deathNo={this.state.score * -1} />
          </div>
          <FlyingPicture
            spinpic={spinpic}
            id="FlyingP"
            pic={this.state.weirdArray[this.state.qNum].url}
          />
        </div>
        <Hangman
          word={this.state.weirdArray[this.state.qNum].word}
          gameState={this.state.weirdArray[this.state.qNum].gameState}
        />
        <Keyboard pressed={this.state.pressed} newGame={this.state.newGame} handleLetterPress={this.handleLetterPress} alphabet={this.state.alphabet}/>
      </div>
    );
  }
}

export default App;
