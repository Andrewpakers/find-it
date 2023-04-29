import { retrieveScores } from "./storageController";
import { useEffect, useState } from "react";
export default function LeaderboardDropdown({ visible }) {
    const defaultLeaderboard = [
        {
            name: '',
            score: 0,
        },
        {
            name: '',
            score: 0,
        },
        {
            name: '',
            score: 0,
        },
    ];
    const [topScores, setTopScores] = useState(defaultLeaderboard);
    useEffect(() => {
        retrieveScores().then((scores) => {
            setTopScores(scores);
        }, (error) => {
            console.error('Error loading leaderboard', error);
        });
    }, [visible]);
    if (visible) {
        return (
            <div className="dropdown">
                <span className="leader leader1">{topScores[0].name}</span>
                <span className="leader leader2">{topScores[1].name}</span>
                <span className="leader leader3">{topScores[2].name}</span>
            </div>
        );
    }
    return
}