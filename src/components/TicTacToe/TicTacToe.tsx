import { debug } from 'console';
import './TicTacToe.css';
import { useState } from 'react';

/**
 * https://react.dev/learn/tutorial-tic-tac-toe
 */

export function RenderGame() {

    const [history, setHistory] = useState<Array<Array<null | 'X' | 'O'>>>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [showHistoryReversed, setShowHistoryReversed] = useState(false);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquares: Array<null | 'X' | 'O'>) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
 
        if (move === history.length - 1) {
            return (
                <li key={move}>
                    <span>{"Next move is #" + (move + 1)}</span>
                </li>
            )
        } else {
            if (move > 0) {
                let diff = findMove(squares, history[move-1])
                let x = Math.floor(diff / 3);
                let y = diff % 3;
                description = `Go to move #${move} (${x+1}, ${y+1})`;
            } else {
                description = 'Go to game start';
            }
            
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{description}</button>
                </li>
            )
        }
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button onClick={() => setShowHistoryReversed(!showHistoryReversed)}>
                    {showHistoryReversed ? 'Current sort order: new to old' : 'Current sort order: old to new'}
                </button>
                <ol>{showHistoryReversed ? moves.reverse() : moves}</ol>
            </div>
        </div>
    )
}

interface BoardProps {
    xIsNext: boolean;
    squares: Array<null | 'X' | 'O'>;
    onPlay: (nextSquares: Array<null | 'X' | 'O'>) => void;
}

function Board({xIsNext, squares, onPlay}: BoardProps) {
    const winningSquareIndexes = calculateWinner(squares)
    const winner = winningSquareIndexes ? squares[winningSquareIndexes[0]] : null;

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (squares.every(square => square !== null)) {
        status = "It's a draw!";
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    function handleClick(index: number) {
        if (squares[index] || calculateWinner(squares)) {
            return;
        }  
        
        const nextSquares = squares.slice();

        if (xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O";
        }

        onPlay(nextSquares);
    }
    
    return (
    <>
        <div className="status">{status}</div>

        {[0,3,6].map((i) => 
            (
                <div key={i} className="board-row" data-desu={i}>
                {[0,1,2].map((j) => 
                    (
                        <Square 
                            isWinningSquare={ (winningSquareIndexes ? winningSquareIndexes.includes(i+j) : false) }
                            key={i+j}
                            value={squares[i+j]} 
                            onSquareClick={() => handleClick(i+j)} 
                        />
                    )
                )}
                </div>
            )
        )}
    </>
    );
}

interface SquareProps {
    value: null | 'X' | 'O';
    onSquareClick: () => void;
    isWinningSquare: boolean;
}

function Square({value, onSquareClick, isWinningSquare}: SquareProps) {
    return (
        <button 
            className={`square ${isWinningSquare ? 'winning-field' : ''}`}
            onClick={onSquareClick}
            >
            {value}
        </button>
    )
}

function calculateWinner(squares: Array<null | 'X' | 'O'>): null | Array<number> {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a,b,c ] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [a, b, c];
        }
    }
    return null;
}

function findMove(squares: Array<null | 'X' | 'O'>, squaresPrev: Array<null | 'X' | 'O'>): number {

    for (let i = 0; i < squares.length; i++) {
        if (squares[i] !== squaresPrev[i]) {
            return i;
        }
    }
    return -1;
}