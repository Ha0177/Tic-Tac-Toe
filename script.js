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
        return boardWithValues;
    };

    const placeMarker = (row, column, playerMarker) => {
        if (board[row][column].getValue() !== "") {
            return false;
        }
        board[row][column].addMarker(playerMarker);
        return true;
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

    const board = Gameboard;

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

    const printNewRound = () => {
        board.getBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const checkGameEnd = () => {
            const currentBoardValues = Gameboard.getBoard().map(row => row.map(cell => cell.getValue()));
            // Horizontal win
            for (let i = 0; i < 3; i++) {
                if (currentBoardValues[i][0] !== "" &&
                    currentBoardValues[i][0] === currentBoardValues[i][1] &&
                    currentBoardValues[i][1] === currentBoardValues[i][2]
                ) {
                    console.log(`${currentBoardValues[i][0]} wins horizontally`)
                    return true;
                }
            }
            // Vertical win
            for (let i = 0; i < 3; i++) {
                if (currentBoardValues[0][i] !== "" &&
                    currentBoardValues[0][i] === currentBoardValues[1][i] &&
                    currentBoardValues[1][i] === currentBoardValues[2][i]
                ) {
                    console.log(`${currentBoardValues[0][i]} wins vertically`)
                    return true;
                    }
                }
                // Diagonal wins
                if (currentBoardValues[0][0] !== "" &&
                    currentBoardValues[0][0] === currentBoardValues[1][1] &&
                    currentBoardValues[1][1] === currentBoardValues[2][2] 
                ) {
                    console.log(`${currentBoardValues[0][0]} wins diagonally`)
                    return true;
                }

                if (currentBoardValues[0][2] !== "" &&
                    currentBoardValues[0][2] === currentBoardValues[1][1] &&
                    currentBoardValues[1][1] === currentBoardValues[2][0] 
                ) {
                    console.log(`${currentBoardValues[0][2]} wins diagonally`)
                    return true;
                }

                let filledCells = 0
                for (let i = 0; i < 3; i++) {
                    for(let j =0; j < 3; j++) {
                        if (currentBoardValues[i][j] !== "") {
                            filledCells++;
                        }
                    }
                }

                if (filledCells === 9) {
                    console.log("It's a draw")
                    return true;
                }
        return false;
    };

    const playGame = (row, column) => {
        const currentPlayerMarker = getActivePlayer().marker;
        const currentPlayerName = getActivePlayer().name;

        const markerPlacedSuccessfully = board.placeMarker(row, column, currentPlayerMarker);

        if (!markerPlacedSuccessfully) {
            return;
        }

        console.log(`Place ${currentPlayerName}'s marker.`)

        if(checkGameEnd()) {
            console.log("Game over!")
            

            return
        }
    }

    printNewRound();

    return {  getActivePlayer, playGame }

})();








