import React from "react";

export function BreakLabel(props) {
  return (
    <div id="break-wrapper">
      <div id="break-label">Break Length</div>

      <div className="length-buttons">
        <button
          className="up-down-buttons"
          id="break-decrement"
          onClick={props.decrement}
        >
          <i class="fas fa-arrow-down"></i>
        </button>
        <p id="break-length">{props.length}</p>
        <button
          className="up-down-buttons"
          id="break-increment"
          onClick={props.increment}
        >
          <i class="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
}
