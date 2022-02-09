import "./App.css";
//import './bootstrap.min.css'
import React, { useState, useEffect } from "react";
import words from "random-words"; //need to get worlist from https://api.dictionaryapi.dev/api somehow
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";

const newWordList = words.wordList
  .filter((element) => {
    return element.length === 5;
  })
  .map((element) => {
    return element.toUpperCase();
  });

function BoxRender(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        variant="contained"
        style={
          props.boxResult[0] === "right"
            ? { backgroundColor: green[500] }
            : props.boxResult[0] !== "wrong"
            ? { backgroundColor: amber[500] }
            : { backgroundColor: red[500] }
        }
      >
        {props.guessWord.split("")[0]}
      </Button>
      <Button
        variant="contained"
        style={
          props.boxResult[1] === "right"
            ? { backgroundColor: green[500] }
            : props.boxResult[1] !== "wrong"
            ? { backgroundColor: amber[500] }
            : { backgroundColor: red[500] }
        }
      >
        {props.guessWord.split("")[1]}
      </Button>
      <Button
        variant="contained"
        style={
          props.boxResult[2] === "right"
            ? { backgroundColor: green[500] }
            : props.boxResult[2] !== "wrong"
            ? { backgroundColor: amber[500] }
            : { backgroundColor: red[500] }
        }
      >
        {props.guessWord.split("")[2]}
      </Button>
      <Button
        variant="contained"
        style={
          props.boxResult[3] === "right"
            ? { backgroundColor: green[500] }
            : props.boxResult[3] !== "wrong"
            ? { backgroundColor: amber[500] }
            : { backgroundColor: red[500] }
        }
      >
        {props.guessWord.split("")[3]}
      </Button>
      <Button
        variant="contained"
        style={
          props.boxResult[4] === "right"
            ? { backgroundColor: green[500] }
            : props.boxResult[4] !== "wrong"
            ? { backgroundColor: amber[500] }
            : { backgroundColor: red[500] }
        }
      >
        {props.guessWord.split("")[4]}
      </Button>
    </div>
  );
}

function ShowDef(props) {
  const [wordDef, setWordDef] = useState("none");

  const getDef = () => {
    fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${props.currentWord}`
    )
      .then((res) => res.json())
      .then((res) => {
        //console.log(res[0].meanings[0].definitions[0].definition);
        setWordDef(res[0].meanings[0].definitions[0].definition);
      });
  };
  useEffect(() => {
    getDef();
  }, []);
  //res.data[0].meanings[0].definitions[0].definition

  return <>{wordDef}</>;
}

function Game(props) {
  const [currentWord, setCurrentWord] = useState(
    newWordList[Math.floor(Math.random() * newWordList.length)]
  );
  const [guessWord, setGuess] = useState("");
  const [wordleResult, setWordleResult] = useState("");
  const [boxResult, setBoxResult] = useState([]);
  const [tryNumber, setTryNumber] = useState(0);
  const [boxArray, setBoxArray] = useState([]);
  /* function changeCurrentWord() {
    setCurrentWord(
      () => newWordList[Math.floor(Math.random() * newWordList.length)]
    );
  } */

  function handleChange(e) {
    setGuess(e.target.value.toUpperCase());
  }

  function handleSubmit(e) {
    setWordleResult(
      guessWord === currentWord
        ? "correct"
        : guessWord === ""
        ? ""
        : "incorrect"
    );

    e.preventDefault();

    let letterMatch = boxResult;
    let guessArray = guessWord.split("");
    let currentArray = currentWord.split("");
    for (let i in guessArray) {
      if (guessArray[i] === currentArray[i]) {
        letterMatch[i] = "right";
        delete currentArray[i];
        //console.log(currentArray);
      }
    }

    for (let i in currentArray) {
      letterMatch[i] = currentArray.includes(guessArray[i])
        ? "somewhere"
        : "wrong";
    }

    setBoxResult(letterMatch);
    if (tryNumber < 6 && wordleResult !== "correct") {
      setTryNumber(tryNumber + 1);
      setBoxArray([
        ...boxArray,
        <BoxRender
          key={tryNumber}
          boxResult={boxResult}
          guessWord={guessWord}
          setGuess={setGuess}
        />,
      ]);
    }

    //if (wordleResult !== "correct" ) {
    //  setBoxArray([ ...boxArray, <div><Button key={Math.random()} style={{alignSelf: 'stretch', color: green[500]}}/></div>]);
    //}
    //console.log(boxResult);
  }

  useEffect(() => {
    console.log("the current correct word is :" + currentWord);
  }, [currentWord]);

  return (
    <div className="jumbotron">
      <h1 style={{ color: "black", textAlign: "center" }}>WORDLE</h1>
      <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
        <label>
          Guess:
          <input
            type="text"
            value={guessWord}
            onChange={(e) => handleChange(e)}
            placeholder="5 letter word"
          />
        </label>
        <input
          disabled={
            guessWord.length !== 5 || newWordList.indexOf(guessWord) === -1
          }
          type="submit"
          value="Guess Word"
        />
      </form>
      {boxArray}
      {wordleResult === "correct" ? (
        <div style={{ textAlign: "center" }}>
          <b>
            {currentWord.split("")[0] + currentWord.slice(1).toLowerCase()}:{" "}
          </b>
          <ShowDef currentWord={currentWord} />{" "}
        </div>
      ) : (
        []
      )}
      <div style={{ textAlign: "center" }}>
        <button onClick={props.startNewGame}> Reset game </button>
      </div>
    </div>
  );
}

/* <button  onClick={
        () => changeCurrentWord()}> Reset word </button>
        */
const Wordle = () => {
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

export default Wordle;
