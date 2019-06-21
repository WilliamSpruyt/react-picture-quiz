import React, { Component } from "react";
import logo from "./logo.svg";
import spinpic from "./spinSearching.svg";
import "whatwg-fetch";
import "./App.css";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Hangman from "./components/hangman";
import FlyingPicture from "./components/flyIngPicture";
import HangmanPic from "./components/hangmanPic";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import Keyboard from "./components/keyboard";
const API_PORT = process.env.PORT;
const url = "/api";
//const url = "http://localhost:3001/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ALPHABET: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ],
      weirdArray: [{ pic: logo, word: "balls", gameState: [0] }],
      qNum: 0,
      score: 0,
      scoreClass: "score",
      round: 1,
      alphabet: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ],
      pressed: [],
      youLose: false
    };

    this.handleLetterPress = this.handleLetterPress.bind(this);
    this.continue = this.continue.bind(this);
  }
  componentDidMount() {
    this.loadPicsFromServer();
    // this.awaitPicsFromServer();
    this.updateDimensions();
  }
  componentWillUnmount() {}
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

  updateDimensions() {
    let update_height = Math.round(window.innerHeight);
    this.setState({ height: update_height });
  }
  youLose = () => {
    this.setState({ youLose: true });
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
  continue() {
    this.setState({
      youLose: false,
      round: 1
    });
    this.state.qNum === this.state.weirdArray.length - 1
      ? this.setState({
          qNum: this.state.qNum + 1,
          pressed: [],
          score: 0,
          alphabet: [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z"
          ]
        },
        () => {
          this.loadPicsFromServer();
        })
      : this.setState({
          qNum: this.state.qNum + 1,
          pressed: [],
          score: 0,
          alphabet: [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z"
          ]
        });
  }
  handleLetterPress(letter) {
    this.setState({ pressed: this.state.pressed.concat(letter) });

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
        let scope = this;

        setTimeout(function() {
          scope.state.qNum === scope.state.weirdArray.length - 1
            ? scope.setState(
                {
                  qNum: 0,
                  round: scope.state.round + 1,
                  pressed: [],
                  score: 0,
                  alphabet: [
                    "a",
                    "b",
                    "c",
                    "d",
                    "e",
                    "f",
                    "g",
                    "h",
                    "i",
                    "j",
                    "k",
                    "l",
                    "m",
                    "n",
                    "o",
                    "p",
                    "q",
                    "r",
                    "s",
                    "t",
                    "u",
                    "v",
                    "w",
                    "x",
                    "y",
                    "z"
                  ]
                },
                () => {
                  scope.loadPicsFromServer();
                }
              )
            : scope.setState({
                qNum: scope.state.qNum + 1,
                round: scope.state.round + 1,
                pressed: [],
                score: 0,
                alphabet: [
                  "a",
                  "b",
                  "c",
                  "d",
                  "e",
                  "f",
                  "g",
                  "h",
                  "i",
                  "j",
                  "k",
                  "l",
                  "m",
                  "n",
                  "o",
                  "p",
                  "q",
                  "r",
                  "s",
                  "t",
                  "u",
                  "v",
                  "w",
                  "x",
                  "y",
                  "z"
                ]
              }),
            () => {};
        }, 1000);
      }
    });

    if (!found) {
      this.setState({
        score: this.state.score - 1
      });
    }
    let letterInd = this.state.alphabet.findIndex(item => {
      return item === letter;
    });

    let alphabetTemp = this.state.alphabet.splice(0);
    alphabetTemp.splice(letterInd, 1);
    this.setState({ alphabet: alphabetTemp });
    if (this.state.score < -13) {
      this.youLose();
    }
  }

  render() {
    return (
      <div className="App">
        <Modal
          isOpen={this.state.youLose}
          toggle={this.continue}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>You Lose</ModalHeader>
          <ModalBody>
            <HangmanPic className={this.state.scoreClass} deathNo={15} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.continue}>
              Continue
            </Button>{" "}
          </ModalFooter>
        </Modal>
        <Container>
          <Row>
            {" "}
            <div className="App-header">
              {"Web Scrape Hang Man Round " + this.state.round}
            </div>{" "}
          </Row>
          <Row>
          {" "}
          <Col xs="6">
            <HangmanPic
              className={this.state.scoreClass}
              deathNo={this.state.score * -1}
            />
          </Col>
          <Col xs="6" maxWidth="50%">
            {" "}
            {this.state.weirdArray[this.state.qNum] && (  <FlyingPicture
              spinpic={spinpic}
              pic={this.state.weirdArray[this.state.qNum].url}
            />)}{" "}
          </Col>
        </Row>
          <Row>
            <Col>
              {this.state.weirdArray[this.state.qNum] && (
                <Hangman
                  word={this.state.weirdArray[this.state.qNum].word}
                  gameState={this.state.weirdArray[this.state.qNum].gameState}
                />
              )}{" "}
            </Col>{" "}
          </Row>
          <Row>
            <Col xs="12">
              {" "}
              <Keyboard
                pressed={this.state.pressed}
                newGame={this.state.newGame}
                handleLetterPress={this.handleLetterPress}
                alphabet={this.state.alphabet}
              />
            </Col>
          </Row>
         
          <Row />
         <Hangman word={this.state.pressed} gameState={this.state.pressed} />
        </Container>
      </div>
    );
  }
}

export default App;
