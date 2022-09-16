const statusDisplay = document.querySelector('.game--status');

let xPlayer = document.createElement("img")
xPlayer.classList.add("red-player");
// xPlayer.classList="red-player";
let oPlayer = document.createElement("img")
oPlayer.classList.add("yellow-player");
// oPlayer.classList="yellow-player";


let gameActive = true;
let currentPlayer =xPlayer;
let gameState = ["", "", "", "", "", "", "", "", ""];

//winner
const winningMessage = () => `Player ${currentPlayer===xPlayer?"xPlayer":"oPlayer"} has won!`;
const drawMessage = () => `Game ended in a draw!`;
// player round
const currentPlayerTurn = () => `It's ${currentPlayer===xPlayer?"xPlayer":"oPlayer"}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    //row
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // column
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    const x = document.createElement("img");
    if (currentPlayer === xPlayer) {
        x.src = "../images/red.png"
        x.classList.add("red-player");
    } else {
        x.src = "../images/yellow.png"
        x.classList.add('yellow-player')
    }

    clickedCell.append(x);
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === xPlayer ? oPlayer : xPlayer;
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = xPlayer;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);