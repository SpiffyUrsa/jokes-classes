import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** JokeList Component: Lists the jokes.
 * 
 * State:
 *  Jokes: Array of jokes to display.
 *  isLoading: boolean to determine whether or not our page is loading.
 * 
 * Props:
 *  numJokesToGet: Number of jokes to display
 * 
 * App => JokeList => Joke
 */

function JokeList(props) {

  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBotting, setIsBotting] = useState(false);
  const [bottingId, setBottingId] = useState(Infinity);

  function generateNewJokes() {
    setIsLoading(true);
  }

  function vote(id, delta) {
    setJokes(jokes => jokes.map(j =>
      j.id === id ? { ...j, votes: j.votes + delta } : j
    ));
  }

  useEffect(function () {
    async function getJokes() {
      try {
        // load jokes one at a time, adding not-yet-seen jokes
        let newJokes = [];
        let seenJokes = new Set();

        while (newJokes.length < props.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { ...joke } = res.data;

          if (!seenJokes.has(joke.id)) {
            seenJokes.add(joke.id);
            newJokes.push({ ...joke, votes: 0 });
          } else {
            console.log("duplicate found!");
          }
        }
        setJokes(newJokes);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    if (isLoading) getJokes();
  }, [props.numJokesToGet, isLoading]);

  function clickBot(id) {
    setIsBotting(prevState => !prevState);
    setBottingId(id);
  }

  useEffect(function botting() {
     if (isBotting) vote(bottingId, 1);
  }, [isBotting, bottingId, vote])


  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    )
  }

  return (
    <div className="JokeList">
      <button
        className="JokeList-getmore"
        onClick={generateNewJokes}
      >
        Get New Jokes
        </button>

      {sortedJokes.map(j => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={vote}
          clickBot={clickBot}
        />
      ))}
    </div>
  );
}


JokeList.defaultProps = {
  numJokesToGet: 5
}


export default JokeList;
