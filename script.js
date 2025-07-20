const Gameboard = (function() {   
    const rows = 3;
    const columns = 3; 
    const board = [];

    for (let i = 0; i < rows; i++) { 
        board[i] = []; 
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell()); 
        }
    }
    const getBoard = () => {
        const boardWithValues = board.map(row => row.map(cell => cell.getValue()));
        console.log(boardWithValues);
    };

    const placeMarker = (row, column, playerMarker) => {
        board[row][column].addMarker(playerMarker);
    }


    return { getBoard, placeMarker };
})();

function Cell() {
    let value = ""

    const getValue = () => value;

    const addMarker = (playerMarker) => {
        value = playerMarker;
    }
    
    return { addMarker, getValue };
    }


const displayController = (function() {
    playerOneName = "Player One"
    playerTwoName = "Player Two"

    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            marker: "X"
        },
        {
            name: playerTwoName,
            marker: "O"
        }
    ];

    let activePlayer = players[0];
    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    
})();










Gameboard.getBoard();
