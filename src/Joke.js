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

function Joke({ id, text, vote, votes, clickBot, downvoteBot }) {

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={evt => vote(id, +1)}>
          <i className="fas btn fa-thumbs-up" />
        </button>

        <button onClick={evt => vote(id, -1)}>
          <i className="fas btn fa-thumbs-down" />
        </button>

        <button onClick={evt => clickBot(id)}>
          <i className="fas btn fa-infinity" />
        </button>

        <button onClick={evt => downvoteBot(id)}>
          <i className="fas fa-infinity btn btn-danger" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
}


export default Joke;
