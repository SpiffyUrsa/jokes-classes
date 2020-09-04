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
  const [isUpBotting, setIsUpBotting] = useState(false);
  const [isDownBotting, setIsDownBotting] = useState(false);
  const [bottingId, setBottingId] = useState(Infinity);

  function generateNewJokes() {
    setIsLoading(true);
  }

  function vote(id, delta) {
    setJokes(jokes => jokes.map(j =>
      j.id === id ? { ...j, votes: j.votes + delta } : j
    ));
  }

  // giving this function a name gives clarity + easier to talk about
  useEffect(function () {
    async function fetchJokes() {
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
    if (isLoading) fetchJokes();
  }, [props.numJokesToGet, isLoading]);


  function clickBot(id) {
    setIsUpBotting(prevState => !prevState);
    setBottingId(id);
  }

  useEffect(function upBotting() {
    if (isUpBotting) vote(bottingId, +1);
  }, [isUpBotting, bottingId, vote])


  function downvoteBot(id) {
    setIsDownBotting(prevState => !prevState);
    setBottingId(id);
  }

  useEffect(function downBotting() {
    if (isDownBotting) vote(bottingId, -1);
  }, [isDownBotting, bottingId, vote])


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
          key={j.id}
          id={j.id}
          text={j.joke}
          votes={j.votes}
          vote={vote}
          clickBot={clickBot}
          downvoteBot={downvoteBot}
        />
      ))}
    </div>
  );
}


JokeList.defaultProps = {
  numJokesToGet: 5
}


export default JokeList;
