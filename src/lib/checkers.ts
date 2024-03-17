import { BoardValues, GameState } from "./types";

export const check_win = (game_board: BoardValues[][]): GameState => {
    for (let rows = 0; rows < 3; rows++) {
        //check rows
        if (game_board[rows][0] === game_board[rows][1] && game_board[rows][1] === game_board[rows][2]) {
            if (game_board[rows][0] === BoardValues.X) {
                return GameState.Xwins;
            } else if (game_board[rows][0] === BoardValues.O) {
                return GameState.Owins;
            }
        }
        // check cols
        for (let cols = 0; cols < 3; cols++) {
            if (game_board[0][cols] === game_board[1][cols] && game_board[1][cols] == game_board[2][cols]) {
                if (game_board[0][cols] === BoardValues.X) {
                    return GameState.Xwins;
                } else if (game_board[0][cols] === BoardValues.O) {
                    return GameState.Owins;
                }
            }
        }

        //check diagonals 
        if (game_board[0][0] === game_board[1][1] && game_board[1][1] === game_board[2][2]) {
            if (game_board[0][0] === BoardValues.X) {
                return GameState.Xwins;
            } else if (game_board[0][0] === BoardValues.O) {
                return GameState.Owins;
            }
        } else if (game_board[0][2] === game_board[1][1] && game_board[1][1] === game_board[2][0]) {
            if (game_board[0][2] === BoardValues.X) {
                return GameState.Xwins;
            } else if (game_board[0][2] === BoardValues.O) {
                return GameState.Owins;
            }
        }

        if (is_board_full(game_board)) {
            return GameState.Draw;
        }
    }
    return GameState.Continue;
}

const is_board_full = (game_board: BoardValues[][]): boolean => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (game_board[i][j] == BoardValues.Empty) return false;
        }
    }
    return true;
}

