// Tic-Tac-Toe/script.js
// ... existing code ...

const displayController = (function() {
    playerOneName = "Player One"
    playerTwoName = "Player Two"

    const board = Gameboard; // Reference to the Gameboard module

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

    let activePlayer = players[0]; // Start with Player One
    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.getBoard(); // Display the current board
        console.log(`${getActivePlayer().name}'s turn.`); // Announce whose turn it is
    };

    // NEW: Placeholder for game end logic (win or tie)
    const checkGameEnd = () => {
        // TODO: Implement comprehensive win condition checks (rows, columns, diagonals)
        // TODO: Implement tie condition check (all cells filled, no winner)
        // For now, it will always return false, meaning the game is never over.
        return false;
    };

    // This is the new function that will manage a single turn of the game
    const playGame = (row, column) => {
        // 1. Get the current player's marker
        const currentPlayerMarker = getActivePlayer().marker;
        const currentPlayerName = getActivePlayer().name;

        // 2. Attempt to place the marker on the board
        const markerPlacedSuccessfully = board.placeMarker(row, column, currentPlayerMarker);

        // If the marker wasn't placed (because the spot was taken), stop this turn.
        if (!markerPlacedSuccessfully) {
            return;
        }

        console.log(`Placed ${currentPlayerName}'s marker at (${row}, ${column}).`);

        // 3. Check if the game has ended (win or tie)
        if (checkGameEnd()) {
            console.log("Game Over!");
            // TODO: Add logic here to announce winner or tie, and prevent further moves
            return; // Game over, stop processing this turn
        }

        // 4. If the game is not over, switch to the next player's turn
        switchTurn();

        // 5. Print the board and the next player's turn
        printNewRound();
    };

    // Initial print of the board when the displayController module is loaded
    printNewRound();

    // Return only the necessary public functions. `playRound` is now replaced by `playGame`.
    return { playGame, getActivePlayer };

})();

// ... remove the redundant Gameboard.getBoard() at the very end if it exists ...
// The initial board is now printed by printNewRound() inside displayController's IIFE.
// You will now call displayController.playGame(row, column) to make moves.