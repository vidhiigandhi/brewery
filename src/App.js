import React from "react";
import "./styles.css";
import IntroScreen from "./IntroScreen";
import DetailScreen from "./DetailScreen";
import Routes from "./route";
import history from './history';

export default function App() {
  return (
    <div className="App">
      <Routes history = {history}/>
    </div>
  );
}
