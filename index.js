let currentPlayer = 1;
let displayLine = document.getElementById('player');
let gameOver = false;
let crossLine = document.getElementById('line');

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
        reset();
    }
})

document.getElementById('reset').addEventListener('click', (e) => {
    reset();
})

function reset(){
    checkedBoxes = [];
    player1Boxes = [];
    player2Boxes = [];

    let boxes = document.getElementsByClassName('data');
    for (let index = 0; index < boxes.length; index++) {
        boxes[index].textContent = '';
    }
    currentPlayer = 1;
    gameOver = false;
    crossLine.style.opacity = 0;
    crossLine.style.margin = 0;
    crossLine.style.width = '100%';
    crossLine.style.transform = 'rotate(0deg)';
    displayLine.textContent = `Player ${currentPlayer}\'s turn`
}

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
            drawALine(winningCombination);
            
            return true
        }
    });
}


//Line functionality
function drawALine(combination) {
    let solution = JSON.stringify(combination);
    
    crossLine.style.opacity = '1';

    if(solution === JSON.stringify(['0','1','2'])){
        crossLine.style.marginTop = '16.5%';
    } else if(solution === JSON.stringify(['3','4','5'])){
        crossLine.style.marginTop = '49.5%'
    } else if(solution === JSON.stringify(['6','7','8'])){
        crossLine.style.marginTop = '82.5%'
    } else if(solution === JSON.stringify(['0','3','6'])){
        crossLine.style.marginLeft = '17%'
        crossLine.style.transform = 'rotate(90deg)';
    } else if(solution === JSON.stringify(['1','4','7'])){
        crossLine.style.marginLeft = '51%'
        crossLine.style.transform = 'rotate(90deg)';
    } else if(solution === JSON.stringify(['2','5','8'])){
        crossLine.style.marginLeft = '85%'
        crossLine.style.transform = 'rotate(90deg)';
    } else if(solution === JSON.stringify(['0','4','8'])){
        crossLine.style.width = '110%'
        crossLine.style.marginLeft = '12%';
        crossLine.style.marginTop = '11%';
        crossLine.style.transform = 'rotate(45deg)';
    } else if(solution === JSON.stringify(['2','4','6'])){
        crossLine.style.width = '110%'
        crossLine.style.marginLeft = '90%';
        crossLine.style.marginTop = '11%';
        crossLine.style.transform = 'rotate(135deg)';
    }
}