import React from "react";

export function SessionLabel(props) {
  return (
    <div id="session-wrapper">
      <div id="session-label">Session Length</div>

      <div className="length-buttons">
        <button
          className="up-down-buttons"
          id="session-decrement"
          onClick={props.decrement}
        >
          <i class="fas fa-arrow-down"></i>
        </button>
        <p id="session-length">{props.length}</p>
        <button
          className="up-down-buttons"
          id="session-increment"
          onClick={props.increment}
        >
          <i class="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
}
