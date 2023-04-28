import { useState, useEffect } from "react";
export default function Timer({ isActive }) {
    const [time, setTime] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    let interval = null;
    useEffect(() => {
        if (!isActive) {
            interval = setInterval(() => {
                setTime((time) => time + 1);
              }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        }
    }, [isActive]);

    useEffect(() => {
        if (time !== 0) {
            setSeconds(time % 60);
            setMinutes(Math.floor(time / 60) % 60);
            setHours(Math.floor((time / 60) /60));
        }
    }, [time]);
    return (
        <span className="timer">{`${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`}</span>
    );
}