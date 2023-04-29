import logo from './logo.svg';
import './App.css';
import Gameboard from './components/gameboard';
import Navbar from './components/navbar';
import { useState, useEffect } from 'react';
import { getCharacters, setHighScore } from './components/storageController';

function App() {
  const [gameWon, setGameWon] = useState(false);  
  const [time, setTime] = useState(0);

  return (
    <div className="App">
      <Navbar time={time} setTime={setTime} gameWon={gameWon} />
      <Gameboard gameWon={gameWon} setGameWon={setGameWon} time={time} setTime={setTime} />
    </div>
  );
}

export default App;
