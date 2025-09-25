import style from './Leaderboard.module.css'
import { Position } from './Position/Position';
import { useState } from 'react';

export function Leaderboard() {
    const [pinnedPositions, setPinnedPositions] = useState<number[]>([]);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);

    function getLeaderboardData(): any[] {
        if (leaderboard.length === 0) {
            setLeaderboard(generateLeaderboardData());
        }
        return leaderboard;
    }

    function updatePinnedPositions(position: number) {
        let index = pinnedPositions.indexOf(position);

        if (index > -1) {
            let newArray  = pinnedPositions.slice();
            newArray.splice(index, 1);
            setPinnedPositions(newArray);
        } else {
            let newArray  = pinnedPositions.slice();
            newArray.push(position);
            newArray.sort((a, b) => a - b);
            setPinnedPositions(newArray);
        }
    }

    let pinnedListLength = pinnedPositions.length;
    return (
        <div className="row">
        <div className={style.leaderboard}>
                <h2>Leaderboard</h2>
                <p>Hint: Click on a position to pin it.</p>
                <ul>
                    {getLeaderboardData().map((_, index) => (
                        <Position 
                            key={index} 
                            Index={index}
                            Name={_.Name} 
                            StickyTop={pinnedPositions.indexOf(index)} 
                            PinnedListLength={ pinnedListLength } 
                            UpdatePinnedState={updatePinnedPositions} 
                            Points={_.Points}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function generateLeaderboardData() {
    return [...Array(100)].map((_, index) => ( {
        Name: `User ${index + 1}`,
        Points: Math.floor(Math.random() * 100)
    })).sort((a, b) => b.Points - a.Points);
}