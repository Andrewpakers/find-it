import { useEffect, useState } from "react";
import LeaderboardDropdown from "./leaderboard-dropdown";
import Timer from "./timer";
export default function Navbar({ gameWon }) {
    const [dropdownVisible, setDropdownVisibile] = useState(false);

    return (
        <div className="navbar">
            <Timer isActive={gameWon} />
            <div className="leaderboard">
                <button type="button" onClick={() => setDropdownVisibile(!dropdownVisible)}>Leaderboard</button>
                <LeaderboardDropdown visible={dropdownVisible} />
            </div>
        </div>
    );
}