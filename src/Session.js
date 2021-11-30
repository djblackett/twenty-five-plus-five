import React from "react";

export function Session(props) {
  return (
    <div id="timer-flex-container">
      <p id="timer-label">{props.timerLabel}</p>
      <p id="time-left" onChange={props.handleChange}>
        {props.timeLeft}
      </p>
    </div>
  );
}
