import { useEffect, useState } from "react";
import backgroundImages from "./imageManager";
import { getCharacters } from "./storageController";

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

export default function Gameboard({ gameWon, setGameWon }) {
    const [box, setBox] = useState({
        x: 0,
        y: 0,
        hidden: true,
    })
    const [characters, setCharacters] = useState([]);
    const [reloadCharacters, setReloadCharacters] = useState([]);

    useEffect(() => {
        getCharacters().then((loadedCharacters) => {
            setCharacters(loadedCharacters);
            setReloadCharacters(JSON.parse(JSON.stringify(loadedCharacters)));
        }, (error) => {
            console.error(`Failed to load characters`, error);
        });
    }, []);
    function reset() {
        setGameWon(false);
        setBox({
            x: 0,
            y: 0,
            hidden: true,
        });
        setCharacters(reloadCharacters);
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
            {gameWon ? (
                <div className="winnerScreen">
                    <span className="winnerText">You Won!</span>
                    <button type="button" onClick={reset}>Reset</button>
                </div>
            ) : null}
            {!box.hidden ? (
                <div>
                    <div className="reticle" style={{ left: box.x, top: box.y }}>{`X: ${box.x}\nY: ${box.y}`}</div>
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