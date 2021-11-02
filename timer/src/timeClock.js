import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTask } from "./actions";

function TimeClock() {
  const [time, setTime] = useState(0);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [timerOn, setTimerOn] = useState(false);
  const [id, setId] = useState(1);
  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerOn]);

  const saveTask = () => {
    setTimerOn(false);
    const payload = {
      id,
      name: taskName,
      time,
    };
    if (time) {
      setId((id) => id + 1);
      dispatch(setTask(payload));
      setTime(0);
    }
    console.log(payload);
  };
  return (
    <div className="App">
      <input
        type="text"
        value={taskName}
        onInput={(e) => setTaskName(e.target.value)}
      ></input>
      <input
        type="number"
        value={time}
        onInput={(e) => setTime(Number(e.target.value))}
        onFocus={() => setTimerOn(false)}
        onBlur={() => setTimerOn(true)}
      ></input>
      <button onClick={() => setTimerOn(true)}>Start</button>
      <button onClick={() => saveTask()}>Stop</button>
      <TasksList />
    </div>
  );
}

function TasksList(props) {
  const { tasks } = useSelector((state) => state);
  if (!tasks.length) return null;
  console.log(tasks);
  return (
    <>
      <p>Total: </p>
      {tasks.map((task) => {
        return (
          <div key={task.id}>
            <span>{task.id}</span> -<span>{task.name}</span>-
            <span>{task.time}</span>
          </div>
        );
      })}
    </>
  );
}

export default TimeClock;
