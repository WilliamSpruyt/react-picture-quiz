import React, { Component } from "react";
import logo from "./logo.svg";
import spinpic from "./spin.svg";
import "whatwg-fetch";
import "./App.css";
import Success from "./pictures/welcome.jpg";
import SuccessPicture from "./components/SuccessPicture";
import FlyingPicture from "./components/flyIngPicture";
import HangmanPic from "./components/hangmanPic";
import { Column, Row } from "simple-flexbox";
import { setTimeout } from "timers";
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
      isRight: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    // this.loadPicsFromServer();
    this.awaitPicsFromServer();
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
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
  hangmanify(word) {
    let answer = [];
    let splitWord = word.split("");
    if (splitWord.length < 5) {
      splitWord.forEach(ele => {
        answer.push(0);
      });
      return answer;
    }
    splitWord.forEach(ele => {
      answer.push(ele === " " ? "/" : Math.random() > 0.5 ? 1 : 0);
    });
    return answer;
  }
  handleChange(value, ind) {
    setTimeout(this.setState({ scoreClass: "score" }), 1000);

    var wordArr = this.state.weirdArray[this.state.qNum].word.split("");

    var gameTempstate = this.state.weirdArray[this.state.qNum];

    if (value.toLowerCase() === wordArr[ind].toLowerCase()) {
      this.setState({
        
        scoreClass: this.state.scoreClass === "scoreUp" ? "scoreUpb" : "scoreUp"
      });
      gameTempstate.gameState[ind] = 1;

      this.setState({ wierdArray: gameTempstate }, () => {
        if (
          gameTempstate.gameState.reduce(
            (accumulator, currentValue) => accumulator + currentValue
          ) === gameTempstate.gameState.length
        ) {
          this.state.qNum === this.state.weirdArray.length - 1
            ? this.setState({ qNum: 0 }, this.awaitPicsFromServer)
            : this.setState({ qNum: this.state.qNum + 1 });
        }
      });
    } else {
      this.setState({
        score: this.state.score - 1,
        scoreClass:
          this.state.scoreClass === "scoreDown" ? "scoreDownb" : "scoreDown"
      });
    }
  }
  render() {
    return (
      <div className="App">
      <div className={'App-header'}>{"Round "+(this.state.qNum+1)}</div>
        <Column horizontal="center">
          <Row vertical="center" horizontal="spaced"><Column horizontal="center">
          <div className={this.state.scoreClass}>
            <HangmanPic
              deathNo={this.state.score * -1}
              height={this.state.height / 2}
            />
          </div>
        </Column>
        <Column horizontal="center">
            <FlyingPicture
              spinpic={spinpic}
              handleChange={this.handleChange}
              gameState={this.state.weirdArray[this.state.qNum].gameState}
              word={this.state.weirdArray[this.state.qNum].word}
              pic={this.state.weirdArray[this.state.qNum].url}
            /></Column>
          </Row>
         
        </Column>
      </div>
    );
  }
}

export default App;
