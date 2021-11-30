import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { BreakLabel } from "./BreakLabel";
import { Session } from "./Session";
import { SessionLabel } from "./SessionLabel";
import { TimerControls } from "./TimerControls";

export default function Clock() {
  const [state, setState] = useState({
    breakLength: 5,
    sessionLength: 25,
    timeLeft: "25:00",
    timerId: "",
    isTimerActive: false,
    timerLabel: "Session",
  });

  const handleResetClick = () => {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    if (state.timer_id !== "") {
      clearInterval(state.timerId);
    }
    setState(() => {
      return {
        breakLength: 5,
        sessionLength: 25,
        timeLeft: "25:00",
        timerId: "",
        isTimerActive: false,
        timerLabel: "Session",
      };
    });
  };

  const handleBreakDecrement = () => {
    setState((prev) => {
      if (state.breakLength > 1) {
        return { ...prev, breakLength: state.breakLength - 1 };
      } else {
        return prev;
      }
    });
  };

  const handleBreakIncrement = () => {
    setState((prev) => {
      if (state.breakLength < 60) {
        return { ...prev, breakLength: state.breakLength + 1 };
      } else {
        return prev;
      }
    });
  };

  const handleSessionDecrement = () => {
    setState((prev) => {
      if (state.sessionLength > 1) {
        let newSessionLength = state.sessionLength - 1;
        return {
          ...prev,
          sessionLength: newSessionLength,
          timeLeft: formatTimeLeft(newSessionLength.toString(), "0"),
        };
      } else {
        return prev;
      }
    });
  };

  const handleSessionIncrement = () => {
    setState((prev) => {
      if (state.sessionLength < 60) {
        let newSessionLength = state.sessionLength + 1;
        return {
          ...prev,
          sessionLength: newSessionLength,
          timeLeft: formatTimeLeft(newSessionLength.toString(), "0"),
        };
      } else {
        return prev;
      }
    });
  };

  const formatTimeLeft = (minutes, seconds) => {
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }

    if (seconds.length == 1) {
      seconds = "0" + seconds;
    }

    let timeLeftString = minutes + ":" + seconds;

    return timeLeftString;
  };

  const setTimer = useCallback((minutes, seconds) => {
    let timerId = setInterval(() => {
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      }

      let newTime = formatTimeLeft(minutes.toString(), seconds.toString());

      setState((prev) => {
        return { ...prev, timeLeft: newTime };
      });
    }, 1000);

    setState((prev) => {
      return { ...prev, timerId: timerId, isTimerActive: true };
    });
  }, []);

  useEffect(() => {
    if (state.timeLeft === "00:00" && state.timerLabel === "Session") {
      clearInterval(state.timerId);
      setState((prev) => {
        return {
          ...prev,
          timerLabel: "Break",
          timerId: "",
          timeLeft: formatTimeLeft(state.breakLength.toString(), "0"),
        };
      });

      document.getElementById("beep").play();
      setTimer(state.breakLength, 0);
    } else if (state.timeLeft === "00:00" && state.timerLabel === "Break") {
      clearInterval(state.timerId);
      setState((prev) => {
        return {
          ...prev,
          timerLabel: "Session",
          timerId: "",
          timeLeft: formatTimeLeft(state.sessionLength.toString(), "0"),
        };
      });

      document.getElementById("beep").play();
      setTimer(state.sessionLength, 0);
    }
  }, [
    state.timeLeft,
    state.timerLabel,
    state.timerId,
    state.breakLength,
    state.sessionLength,
    setTimer,
  ]);

  const startCountDown = () => {
    let time = state.timeLeft;
    let minutes = time.substring(0, 2);
    let seconds = time.substring(3);

    if (state.timerId === "") {
      setTimer(parseInt(minutes), parseInt(seconds));
    } else {
      clearInterval(state.timerId);
      setState((prev) => {
        return { ...prev, timerId: "" };
      });
    }

    let timeLeftString = formatTimeLeft(minutes, seconds);

    setState((prev) => {
      return { ...prev, timeLeft: timeLeftString };
    });
  };

  return (
    <div id="clock">
      <h1 id="app-title">25 + 5 Clock</h1>
      <BreakLabel
        increment={handleBreakIncrement}
        decrement={handleBreakDecrement}
        length={state.breakLength}
      />
      <SessionLabel
        increment={handleSessionIncrement}
        decrement={handleSessionDecrement}
        length={state.sessionLength}
      />
      <Session timeLeft={state.timeLeft} timerLabel={state.timerLabel} />
      <TimerControls
        resetClick={handleResetClick}
        startClick={startCountDown}
      />
      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        preload="auto"
      ></audio>
    </div>
  );
}

ReactDOM.render(<Clock />, document.getElementById("root"));
