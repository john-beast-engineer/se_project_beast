import { useEffect, useState } from "react";
import { formatDuration } from "../../utils/xp.js";
import "./Timer.css";

function Timer({ seconds, setSeconds }) {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning, setSeconds]);

  return (
    <div className="timer">
      <span className="timer__clock">{formatDuration(seconds)}</span>
      <button
        className="timer__btn"
        type="button"
        onClick={() => setIsRunning((v) => !v)}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        className="timer__btn"
        type="button"
        onClick={() => {
          setIsRunning(false);
          setSeconds(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Timer;
