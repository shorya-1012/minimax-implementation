import { check_win } from "./checkers";
import { BoardValues, GameState, MovePair } from "./types"

export const findBestMove = (game_board: BoardValues[][]): MovePair => {
    let bestMove: MovePair = { first: 0, second: 0 };
    let bestScore = Infinity;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (game_board[row][col] === BoardValues.Empty) {
                game_board[row][col] = BoardValues.O;
                let score = minimax(game_board, -Infinity, Infinity, 0, true);
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

const minimax = (game_board: BoardValues[][], alpha: number, beta: number, depth: number, isMaximising: boolean): number => {
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
        let bestScore = -Infinity;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (game_board[row][col] === BoardValues.Empty) {
                    game_board[row][col] = BoardValues.X;
                    let score = minimax(game_board, alpha, beta, depth + 1, false);
                    game_board[row][col] = BoardValues.Empty;
                    bestScore = Math.max(bestScore, score);
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (game_board[row][col] === BoardValues.Empty) {
                    game_board[row][col] = BoardValues.O;
                    let score = minimax(game_board, alpha, beta, depth + 1, true);
                    game_board[row][col] = BoardValues.Empty;
                    bestScore = Math.min(bestScore, score);
                    beta = Math.min(beta, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return bestScore;
    }
}

