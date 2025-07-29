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
    let gameOver = false;

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        renderBoard();
    }

    const resetGame = () => {
        board.reset();
        activePlayer = players[0];
        gameOver = false;
        const resultDisplay = document.querySelector(".result-display");
        resultDisplay.textContent = "";
        resultDisplay.classList.remove("X","O","draw");
        printNewRound()
    }

    const checkGameEnd = () => {
        const currentBoardValues = Gameboard.getBoard();
        
        // Horizontal win
        for (let i = 0; i < 3; i++) {
            if (
                currentBoardValues[i][0] !== "" &&
                currentBoardValues[i][0] === currentBoardValues[i][1] &&
                currentBoardValues[i][1] === currentBoardValues[i][2]
            ) {
                return `${getActivePlayer().marker}_wins`;
            }
        }
        // Vertical win
        for (let i = 0; i < 3; i++) {
            if (
                currentBoardValues[0][i] !== "" &&
                currentBoardValues[0][i] === currentBoardValues[1][i] &&
                currentBoardValues[1][i] === currentBoardValues[2][i]
            ) {
                return `${getActivePlayer().marker}_wins`;
            }
        }
        // Diagonal wins
        if (
            currentBoardValues[0][0] !== "" &&
            currentBoardValues[0][0] === currentBoardValues[1][1] &&
            currentBoardValues[1][1] === currentBoardValues[2][2]
        ) {
            return `${getActivePlayer().marker}_wins`;
        }

        if (
            currentBoardValues[0][2] !== "" &&
            currentBoardValues[0][2] === currentBoardValues[1][1] &&
            currentBoardValues[1][1] === currentBoardValues[2][0]
        ) {
            return `${getActivePlayer().marker}_wins`;
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
            return "draw";
        }
        return "none"; 
    };
    
    const playGame = (row, column) => {
        const currentPlayerMarker = getActivePlayer().marker;
        const markerPlacedSuccessfully = board.placeMarker(row, column, currentPlayerMarker);

        if (!markerPlacedSuccessfully) {
            return;
        }

        const gameStatus = checkGameEnd();
        const resultDisplay = document.querySelector(".result-display");

        if (gameStatus === "X_wins" || gameStatus === "O_wins") {
            resultDisplay.classList.add(getActivePlayer().marker);
            resultDisplay.textContent = `${getActivePlayer().name} wins`;
            gameOver = true;
            renderBoard(); 
            return;
        } else if (gameStatus === "draw") {
            resultDisplay.classList.add("draw");
            resultDisplay.textContent = `It's a draw`;
            gameOver = true;
            renderBoard(); 
            return;
        }

        switchTurn();
        renderBoard();
    }

    const renderBoard = () => {
        const gameBoardDiv = document.querySelector(".gameboard");
        gameBoardDiv.innerHTML = "";
        const turnDisplay = document.querySelector(".turn-display");
       
        
        turnDisplay.classList.remove("one", "two");
        if (getActivePlayer() === players[0]) {
            turnDisplay.classList.add("one")
        } else {
            turnDisplay.classList.add("two")
        }
            turnDisplay.textContent = `It's ${getActivePlayer().name}'s turn!`;
        if (gameOver === true) {
            turnDisplay.textContent = "";
        }
        
    
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
                    if (cellValue !== "") {
                        return;
                    }
                    if (gameOver === true) {
                        return;
                    }
                    playGame(rowIndex, colIndex);
                    renderBoard();
                });

                if (!cellValue) {
                    cellDiv.addEventListener("mouseover", () => {
                        if (gameOver) return;
                        const activePlayerMarker = getActivePlayer().marker;
                        cellDiv.textContent = activePlayerMarker;
                        cellDiv.classList.add("preview");
                        cellDiv.classList.add(activePlayerMarker);
                    });
                    cellDiv.addEventListener("mouseout", () => {
                        cellDiv.textContent = "";
                    })
                }

                gameBoardDiv.appendChild(cellDiv);
            });
        });

            const saveNamesBtn = document.querySelector(".save-names-button");
            const chosenNameOne = document.querySelector("#playerOneName");
            const chosenNameTwo = document.querySelector("#playerTwoName");
            saveNamesBtn.addEventListener("click", () => {
            players[0].name = chosenNameOne.value;
            players[1].name = chosenNameTwo.value;
            if (!chosenNameOne.value && !chosenNameTwo.value) {
                players[0].name = playerOneName; 
                players[1].name = playerTwoName;
            } 
            renderBoard();
        });


    }

    printNewRound();
    

    return {  getActivePlayer, playGame }

})();








