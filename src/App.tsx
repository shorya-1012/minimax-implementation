import { useEffect, useState } from "react";
import { check_win } from "./lib/checkers";
import { PlayerTurn, GameState, BoardValues } from "./lib/types";
import { findBestMove } from "./lib/minimax";

function App() {

    const [gameBoard, setGameBoard] = useState<BoardValues[][]>([
        [BoardValues.Empty, BoardValues.Empty, BoardValues.Empty],
        [BoardValues.Empty, BoardValues.Empty, BoardValues.Empty], [BoardValues.Empty, BoardValues.Empty, BoardValues.Empty],]);

    const [playerTurn, setPlayerTurn] = useState(PlayerTurn.Human);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameResultMessage, setGameResultMessage] = useState("");

    useEffect(() => {
        if (playerTurn === PlayerTurn.Ai) {
            let updatedGameBoard = [...gameBoard];
            let bestMove = findBestMove(updatedGameBoard); // Use updatedGameBoard here
            updatedGameBoard[bestMove.first][bestMove.second] = BoardValues.O;
            setGameBoard(updatedGameBoard);
            setPlayerTurn(PlayerTurn.Human);
        }
    }, []);

    const handle_click = (row: number, col: number) => {
        if (gameBoard[row][col] !== BoardValues.Empty) {
            return;
        }
        let updatedGameBoard = [...gameBoard];
        if (playerTurn === PlayerTurn.Human) {
            updatedGameBoard[row][col] = BoardValues.X;
            setPlayerTurn(PlayerTurn.Ai);
        }
        setGameBoard(updatedGameBoard);

        //check if game is over
        let result = check_win(gameBoard);
        if (result != GameState.Continue) {
            if (result === GameState.Xwins) {
                setGameResultMessage("X WINS !!!");
            } else if (result === GameState.Owins) {
                setGameResultMessage("O WINS !!!");
            } else {
                setGameResultMessage("DRAW ");
            }
            setIsGameOver(true);
            return;
        }

        if (isGameOver) return;
        updatedGameBoard = [...gameBoard];
        let bestMove = findBestMove(updatedGameBoard);
        updatedGameBoard[bestMove.first][bestMove.second] = BoardValues.O;
        setGameBoard(updatedGameBoard);
        setPlayerTurn(PlayerTurn.Human);

        //check if game is over
        result = check_win(gameBoard);
        if (result != GameState.Continue) {
            if (result === GameState.Xwins) {
                setGameResultMessage("YOU WIN !!!");
            } else if (result === GameState.Owins) {
                setGameResultMessage("YOU LOOSE !!!");
            } else {
                setGameResultMessage("DRAW ");
            }
            setIsGameOver(true);
        }
    }

    const resetGame = () => {
        let updatedGameBoard = [...gameBoard];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                updatedGameBoard[row][col] = BoardValues.Empty;
            }
        }
        setGameBoard(updatedGameBoard);
        setIsGameOver(false);
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-zinc-900 text-white">
            {isGameOver &&
                <div className="text-3xl font-sans text-center mb-10">
                    <h1>GAME OVER !!!</h1>
                    <h2>{gameResultMessage}</h2>
                </div>
            }
            <div className="p-3 flex justify-center items-center bg-zinc-300 rounded-2xl">
                <div className="grid grid-cols-3 gap-2">
                    {gameBoard.map((row, rowIndex) => (
                        row.map((cell, cellIndex) => (
                            <button key={`${rowIndex}-${cellIndex}`}
                                className="w-[90px] h-[90px] border border-gray-800 p-5 -2xl text-center text-5xl flex justify-center items-center bg-blue-500 rounded-2xl hover:bg-blue-600"
                                onClick={() => handle_click(rowIndex, cellIndex)}
                                disabled={isGameOver}
                            >
                                {cell === 2 ? " " : cell === 0 ? "X" : "O"}
                            </button>
                        ))
                    ))}
                </div>
            </div>
            {
                isGameOver &&
                <button className="rounded-xl bg-zinc-300 px-3 py-2 mt-5 text-zinc-900 hover:bg-zinc-500"
                    onClick={resetGame}
                >
                    Reset
                </button>
            }
        </div>
    )
}

export default App
