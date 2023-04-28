export default function LeaderboardDropdown({ visible }) {
    if (visible) {
        return (
            <div className="dropdown">
                <span className="leader leader1">Leader #1</span>
                <span className="leader leader2">Leader #2</span>
                <span className="leader leader3">Leader #3</span>
            </div>
        );
    }
    return
}