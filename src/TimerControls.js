import React from "react";

export function TimerControls(props) {
  return (
    <div id="controls">
      <button id="start_stop" onClick={props.startClick}>
        Start/Stop
      </button>
      <button id="reset" onClick={props.resetClick}>
        Reset
      </button>
    </div>
  );
}
