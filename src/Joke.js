import React from "react";
import "./Joke.css";

/** Joke Component: Displays a joke.
 * 
 * Props:
 *  id: id of the joke.
 *  vote: A function that either increases the vote count or decreases it.
 *  votes: Total number of votes the joke has.
 *  text: The text of the joke.
 * 
 * 
 * App => JokeList => Joke
 */

function Joke({ id, vote, votes, text, clickBot }) {

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={evt => vote(id, +1)}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={evt => vote(id, -1)}>
          <i className="fas fa-thumbs-down" />
        </button>

        <button onClick={evt => clickBot(id)}>
          <i className="fas fa-infinity" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
}


export default Joke;
