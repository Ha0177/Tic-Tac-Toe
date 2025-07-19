function Gameboard() {   
    const rows = 3;
    const collumns = 3; 
    const board = [];

    for (let i = 0; i < rows; i++) { 
        board[i] = []; 
        for (let j = 0; j < collumns; j++) {
            board[i].push(Cell()); 
        }
    }
    
    const getBoard = () => board;

}
