import "./App.css";
import React from "react";
import TimeClock from "./timeClock";
import FetchDebounced from "./fetchDebounced";

function App() {
  return (
    <>
      <TimeClock />
      <FetchDebounced />
    </>
  );
}

export default App;
