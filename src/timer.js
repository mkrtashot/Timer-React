import { useState, useEffect } from "react";
import Seconds from "./seconds";
import Minutes from "./minutes";
import Hours from "./hours";

export default function Timer() {
  let [sec, setSec] = useState(0);
  let [defSec, setDefSec] = useState(0);
  let [min, setMin] = useState(0);
  let [defMin, setDefMin] = useState(0);
  let [hr, setHr] = useState(0);
  let [defHr, setDefHr] = useState(0);
  let [id, setId] = useState(0);
  let [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (sec === 0 && min === 0 && hr === 0) {
      clearInterval(id);
      setTimerStarted(false);
      if (timerStarted) {
        alert("Timer is done");
      }
    } else {
      if (min === -1) {
        if (hr > 0) {
          setHr(() => hr - 1);
          setMin(() => (min = 59));
          setSec(() => (sec = 59));
        }
      }

      if (sec === -1) {
        if (min > 0 || hr > 0) {
          if (min > 0) {
            setMin(() => min - 1);
            setSec(() => (sec = 59));
          } else {
            setHr(() => hr - 1);
            setMin(() => (min = 59));
            setSec(() => (sec = 59));
          }
        }
      }
    }

    if (timerStarted) {
      setDefSec(0);
      setDefMin(0);
      setDefHr(0);
    }
  }, [sec, id]);

  const HandleSec = (e) => {
    if (!timerStarted) {
      setSec(+e.target.value);
      setDefSec(+e.target.value);
    }
  };

  const HandleMin = (e) => {
    if (!timerStarted) {
      setMin(+e.target.value);
      setDefMin(+e.target.value);
    }
  };

  const HandleHr = (e) => {
    if (!timerStarted) {
      setHr(+e.target.value);
      setDefHr(+e.target.value);
    }
  };

  const startTimer = () => {
    if (!timerStarted) {
      setTimerStarted(true);
      const test = setInterval(() => {
        setSec((sec) => sec - 1);
      }, 1000);

      setId(test);
    }
  };

  const pauseTimer = () => {
    setTimerStarted(false);
    clearInterval(id);
  };

  const stopTimer = () => {
    setTimerStarted(false);
    setMin(() => 0);
    setSec(() => 0);
    setHr(() => 0);
  };

  let time = "Hours: " + hr + " Minutes: " + min + " Seconds: " + sec;

  return (
    <>
      <header className="header">Ashot's Timer</header>
      <div className="timer">
        <div className="time">TIMER: {time}</div>

        <div className="customizable">
          <div className="hours-part">
            <div className="hours-text">Hours</div>
            <select id="hours" value={defHr} onChange={HandleHr}>
              <Hours />
            </select>
          </div>

          <div className="minutes-part">
            <div className="minutes-tex">Minutes</div>
            <select id="minutes" value={defMin} onChange={HandleMin}>
              <Minutes />
            </select>
          </div>

          <div className="seconds-part">
            <div className="seconds-text">Seconds</div>
            <select id="seconds" value={defSec} onChange={HandleSec}>
              <Seconds />
            </select>
          </div>
        </div>

        <div className="buttons-part">
          <button className="start-button" onClick={startTimer}>
            Start
          </button>
          <button className="pause-button" onClick={pauseTimer}>
            Pause
          </button>
          <button className="stop-button" onClick={stopTimer}>
            Stop
          </button>
        </div>
      </div>
    </>
  );
}
