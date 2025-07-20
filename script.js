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

    const reset = () => {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                board[i][j].addMarker("");
            }
        }
    }


    return { getBoard, placeMarker, reset };
})();

function Cell() {
    let value = ""

    const getValue = () => value;

    const addMarker = (playerMarker) => {
        value = playerMarker;
    }
    
    
    return { addMarker, getValue};
    }


const displayController = (function() {

    playerOneName = "Player One"
    playerTwoName = "Player Two"

    const restartButton = document.querySelector(".restart-button")
    restartButton.addEventListener("click", () => {
        resetGame();
    })

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
        renderBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const resetGame = () => {
        board.reset();
        activePlayer = players[0];
        const resultDisplay = document.querySelector(".result-display");
        resultDisplay.textContent = "";
        resultDisplay.classList.remove("X, O, draw");
        printNewRound()
    }

    const checkGameEnd = () => {
        const currentBoardValues = Gameboard.getBoard();
        const resultDisplay = document.querySelector(".result-display")
        renderBoard();
        // Horizontal win
        for (let i = 0; i < 3; i++) {
            if (
                currentBoardValues[i][0] !== "" &&
                currentBoardValues[i][0] === currentBoardValues[i][1] &&
                currentBoardValues[i][1] === currentBoardValues[i][2]
            ) {
                resultDisplay.classList.add(`${getActivePlayer().marker}`);
                resultDisplay.textContent = `${getActivePlayer().name} wins horizontally`;
                return true;
            }
        }
        // Vertical win
        for (let i = 0; i < 3; i++) {
            if (
                currentBoardValues[0][i] !== "" &&
                currentBoardValues[0][i] === currentBoardValues[1][i] &&
                currentBoardValues[1][i] === currentBoardValues[2][i]
            ) {
                resultDisplay.classList.add(`${getActivePlayer().marker}`);
                resultDisplay.textContent = `${getActivePlayer().name} wins vertically`;
                return true;
            }
        }
        // Diagonal wins
        if (
            currentBoardValues[0][0] !== "" &&
            currentBoardValues[0][0] === currentBoardValues[1][1] &&
            currentBoardValues[1][1] === currentBoardValues[2][2]
        ) {
            resultDisplay.classList.add(`${getActivePlayer().marker}`);
            resultDisplay.textContent = `${getActivePlayer().name} wins diagonally`;
            return true;
        }

        if (
            currentBoardValues[0][2] !== "" &&
            currentBoardValues[0][2] === currentBoardValues[1][1] &&
            currentBoardValues[1][1] === currentBoardValues[2][0]
        ) {
            resultDisplay.classList.add(`${getActivePlayer().marker}`);
            resultDisplay.textContent = `${getActivePlayer().name} wins diagonally`;

            return true;
        }

        let filledCells = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (currentBoardValues[i][j] !== "") {
                    filledCells++;
                }
            }
        }

        if (filledCells === 9) {
            resultDisplay.classList.add("draw");
            resultDisplay.textContent = `It's a draw`;
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

        console.log(`Placed ${currentPlayerName}'s marker.`)

        if(checkGameEnd()) {
            console.log("Game over!")
            return;
        }

        switchTurn();
        renderBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const renderBoard = () => {
        const gameBoardDiv = document.querySelector(".gameboard");
        gameBoardDiv.innerHTML = "";
        const turnDisplay = document.querySelector(".turn-display");
       
        // Update player turn display
        turnDisplay.classList.remove("one", "two");
        if (getActivePlayer() === players[0]) {
            turnDisplay.classList.add("one")
        } else {
            turnDisplay.classList.add("two")
        }
            turnDisplay.textContent = `It's ${getActivePlayer().name}'s turn!`;
        

        const currentBoardValues = board.getBoard();

        currentBoardValues.forEach((row, rowIndex) => {
            row.forEach((cellValue, colIndex) => {
                const cellDiv = document.createElement("button");
                cellDiv.classList.add("cell");
                cellDiv.dataset.row = rowIndex;
                cellDiv.dataset.column = colIndex;
                cellDiv.textContent = cellValue;
                if (cellValue) {
                    cellDiv.classList.add(cellValue);
                }
                cellDiv.addEventListener("click", () => {
                    playGame(rowIndex, colIndex);
                    renderBoard();
                });
                gameBoardDiv.appendChild(cellDiv);
            });
        });
    }

    printNewRound();
    

    return {  getActivePlayer, playGame }

})();








