import logo from './logo.svg';
import './App.css';
import Gameboard from './components/gameboard';
import Navbar from './components/navbar';
import { useState } from 'react';
import { getCharacters } from './components/storageController';

function App() {
  const [gameWon, setGameWon] = useState(false);
  return (
    <div className="App">
      <Navbar />
      <Gameboard gameWon={gameWon} setGameWon={setGameWon} />
    </div>
  );
}

export default App;
