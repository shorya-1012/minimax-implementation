export enum BoardValues {
    X,
    O,
    Empty
}

export enum PlayerTurn {
    Human,
    Ai
}

export enum GameState {
    Xwins,
    Owins,
    Draw,
    Continue
}

export interface MovePair {
    first : number,
    second : number,
}
