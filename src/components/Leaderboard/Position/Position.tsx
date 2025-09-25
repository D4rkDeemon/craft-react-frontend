import { useState } from "react";
import styles from './Position.module.css';


interface PositionProps {
    Index: number
    Name: string;
    StickyTop: number;
    PinnedListLength: number;
    Points: number;
    UpdatePinnedState: (position: number) => void;
}

export function Position({ Index, Name, Points, UpdatePinnedState, StickyTop, PinnedListLength }: PositionProps) {
    
    const [isPinned, setIsPinned] = useState(false);

    return (
        <li 
            className={`${styles.Position} ${isPinned ? styles['is-pinned'] : ''}`} 
            onClick={() => {
                onClickHandler(setIsPinned);
                UpdatePinnedState(Index);
            }}
            style={{ '--sticky-top': `${StickyTop}`, '--sticky-bottom': `${PinnedListLength - StickyTop - 1}` } as React.CSSProperties}
        >{Index+1}. {Name}: {Points} points</li>
    )
}

function onClickHandler(setIsPinned: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsPinned((prev) => !prev);
}