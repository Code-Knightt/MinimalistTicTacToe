let currentPlayer = 1;
let displayLine = document.getElementById('player');
let gameOver = false;

displayLine.textContent = `Player ${currentPlayer}\'s turn`

let checkedBoxes = [];
let player1Boxes = [];
let player2Boxes = [];
let winningCombination = [];

let winningCombinations = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']
]

//Clicking Functionality
function iGotClicked(_id) {
    if (!gameOver) {
        let box = document.getElementById(_id);
        if (!checkedBoxes.includes(_id)) {
            if (currentPlayer == 1) {
                box.textContent = 'X';
                currentPlayer++;
                player1Boxes.push(_id);
            } else {
                box.textContent = 'O';
                player2Boxes.push(_id);
                currentPlayer--;
            }
            checkedBoxes.push(_id);
        }
        displayLine.textContent = `Player ${currentPlayer}\'s turn`

        if (checkedBoxes.length === 9) {
            if (!isWinner(player1Boxes, 1) && !isWinner(player2Boxes, 2)) {
                displayLine.textContent = `It's a draw!`;
            }
        }
        
        isWinner(player1Boxes, 1);
        isWinner(player2Boxes, 2);
    }
}


//Reset Functionality
document.addEventListener('keypress', (e) => {
    if (e.key.toLowerCase() === 'r') {
        checkedBoxes = [];
        player1Boxes = [];
        player2Boxes = [];

        let boxes = document.getElementsByClassName('data');
        for (let index = 0; index < boxes.length; index++) {
            boxes[index].textContent = '';
        }
    }
    currentPlayer = 1;
    gameOver = false;
    displayLine.textContent = `Player ${currentPlayer}\'s turn`
})

//Winning Functionality
function isWinner(playerArray, playerNumber) {

    winningCombinations.forEach(combination => {
        let winnerFlag = true;
        combination.forEach(element => {
            if (playerArray.indexOf(element) === -1) {
                winnerFlag = false;
            }
        })
        if (winnerFlag) {
            displayLine.textContent = `Player ${playerNumber} is winner`;
            winningCombination = combination;
            gameOver = true;
            return true
        }
    });
}
