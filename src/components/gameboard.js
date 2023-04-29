import { useEffect, useState } from "react";
import backgroundImages from "./imageManager";
import { getCharacters, retrieveScores, setHighScore } from "./storageController";

function didWin(characters, setGameWon, setBox) {
    let didWin = true;
    characters.forEach(character => {
        if (!character.found) {
            didWin = false;
        }
    });
    if (didWin) {
        setGameWon(true);
        setBox({
            hidden: true,
        })
    }
}

function characterSelection(characters, setCharacters, key, x, y, setGameWon, setBox) {
    const newCharacterList = characters;
    for (let i = 0; i < newCharacterList.length; i++) {
        const xRange = x - newCharacterList[i].x;
        const yRange = y - newCharacterList[i].y;
        if (xRange >= -50 && xRange <= 50) {
            if (yRange >= -50 && yRange <= 50) {
                if (key === newCharacterList[i].key) {
                    newCharacterList[i].found = true;
                    setCharacters(newCharacterList);
                    didWin(characters, setGameWon, setBox);
                    return true;
                }
            }
        }
    }
    return false;
}

function WinScreen({ highscores, reset, gameWon, time, isHighscore, setIsHighscore }) {
    const [input, setInput] = useState('');
    function handleInput(evt) {
        setInput(evt.target.value);
    }
    function handleSubmit(evt) {
        setHighScore(input, time);
        reset();
    }
    if (gameWon) {
        return (
            <div className="winnerScreen">
                <span className="winnerText">You Won!</span>
                {isHighscore ? (
                    <div className="inputBox">
                        <label htmlFor="leaderName">Name:</label>
                        <input type="text" id="leaderName" name="leaderName" onChange={handleInput} value={input}></input>
                    </div>
                ) : null}
                <button type="button" onClick={reset}>Reset</button>
                {isHighscore ? (
                    <button type="button" onClick={handleSubmit}>Submit</button>
                ) : null}
            </div>
        );
    }
    return
}

export default function Gameboard({ gameWon, setGameWon, time, setTime }) {
    const [box, setBox] = useState({
        x: 0,
        y: 0,
        hidden: true,
    })
    const [characters, setCharacters] = useState([]);
    const [reloadCharacters, setReloadCharacters] = useState([]);
    const [topScores, setTopScores] = useState(null);
    const [isHighscore, setIsHighscore] = useState(false);
    // Load characters and score
    useEffect(() => {
        getCharacters().then((loadedCharacters) => {
            setCharacters(loadedCharacters);
            setReloadCharacters(JSON.parse(JSON.stringify(loadedCharacters)));
        }, (error) => {
            console.error(`Failed to load characters`, error);
        });
        retrieveScores().then((highscores) => {
            setTopScores(highscores);
        }, (error) => {
            console.error('Failed to load highscores', error)
        })
    }, []);
    //Test if score is a high score
    useEffect(() => {
        if (gameWon) {
            if (topScores && time < topScores[2].score) {
                setIsHighscore(true);
            }
        }
    }, [gameWon]);
    // console.log coordinates of a click
    useEffect(() => {
        if (!box.hidden) {
            console.log(`X: ${box.x} Y: ${box.y}`);
        }
    }, [box]);
    function reset() {
        setGameWon(false);
        setBox({
            x: 0,
            y: 0,
            hidden: true,
        });
        setCharacters(JSON.parse(JSON.stringify(reloadCharacters)));
        setTime(0);
        setIsHighscore(false);
    }
    function handleClick(event) {
        if (event.target.type !== 'button' && !gameWon) {
            setBox({
                x: event.nativeEvent.offsetX,
                y: event.nativeEvent.offsetY, 
                hidden: !box.hidden,
            });
        }
    }
    return (
        <div className="gameboard" onClick={handleClick}>
            <img className="backgroundImage" src={backgroundImages()[0].image} alt={backgroundImages()[0].description}></img>
            <span className="attribution">Image by <a href="https://www.artstation.com/artwork/48v6RW">Brenna Maeve</a></span>
            <WinScreen reset={reset} highscores={topScores} gameWon={gameWon} time={time} isHighscore={isHighscore} setIsHighscore={setIsHighscore} />
            {!box.hidden ? (
                <div>   
                    <div className="reticle" style={{ left: box.x, top: box.y }}></div>
                    <div className="menu" style={{ left: box.x, top: box.y }}>
                        {
                            characters.map((character) => {
                                if (character.found) {
                                    return (
                                        <button type="button" className="menuButton found" key={character.key}>{character.name}</button>
                                    );
                                }
                                return (
                                    <button type="button" onClick={(event) => {
                                        if (characterSelection(characters, setCharacters, character.key, box.x, box.y, setGameWon, setBox)) {
                                            event.target.classList.add('found');
                                        } else {
                                            event.target.classList.add('wrong');
                                        }
                                    }} className="menuButton" key={character.key}>{character.name}</button>
                                );
                            })
                        }
                    </div>
                </div>
            ) : null}
        </div>
    );
}