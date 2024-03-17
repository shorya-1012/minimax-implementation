import { check_win } from "./checkers";
import { BoardValues, GameState, MovePair } from "./types"

export const findBestMove = (game_board: BoardValues[][]): MovePair => {
    let bestMove: MovePair = { first: 0, second: 0 };
    let bestScore = Infinity;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (game_board[row][col] === BoardValues.Empty) {
                game_board[row][col] = BoardValues.O;
                let score = minimax(game_board, 0, true);
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = { first: row, second: col };
                }
                game_board[row][col] = BoardValues.Empty;
            }
        }
    }
    return bestMove;
}

const minimax = (game_board: BoardValues[][], depth: number, isMaximising: boolean): number => {
    if (check_win(game_board) === GameState.Owins) {
        return -1;
    }
    if (check_win(game_board) === GameState.Xwins) {
        return 1;
    }
    if (check_win(game_board) === GameState.Draw) {
        return 0;
    }

    if (isMaximising === true) {
        let bestValue = -Infinity;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (game_board[row][col] === BoardValues.Empty) {
                    game_board[row][col] = BoardValues.X;
                    let value = minimax(game_board, depth + 1, false);
                    bestValue = Math.max(bestValue, value);
                    game_board[row][col] = BoardValues.Empty;
                }
            }
        }
        return bestValue;
    } else {
        let bestValue = Infinity;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (game_board[row][col] === BoardValues.Empty) {
                    game_board[row][col] = BoardValues.O;
                    let value = minimax(game_board, depth + 1, true);
                    bestValue = Math.min(bestValue, value);
                    game_board[row][col] = BoardValues.Empty;
                }
            }
        }
        return bestValue;
    }
}

