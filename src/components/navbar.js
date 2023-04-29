import { useEffect, useState } from "react";
import LeaderboardDropdown from "./leaderboard-dropdown";
import Timer from "./timer";
export default function Navbar({ gameWon, time, setTime }) {
    const [dropdownVisible, setDropdownVisibile] = useState(false);

    return (
        <div className="navbar">
            <Timer isInactive={gameWon} time={time} setTime={setTime} />
            <div className="leaderboard">
                <button type="button" onClick={() => setDropdownVisibile(!dropdownVisible)}>Leaderboard</button>
                <LeaderboardDropdown visible={dropdownVisible} />
            </div>
        </div>
    );
}