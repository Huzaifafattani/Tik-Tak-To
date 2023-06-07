let currentPlayer = 'X';
let cells = document.getElementsByClassName('cell');
let gameOver = false;
let winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

function makeMove(cellIndex) {
  if (!gameOver && !cells[cellIndex].innerText) {
    cells[cellIndex].innerText = currentPlayer;
    cells[cellIndex].classList.add(currentPlayer);
    
    if (checkWin(currentPlayer)) {
      gameOver = true;
      highlightWinningCombo(currentPlayer);
      setTimeout(function() {
        alert(currentPlayer + ' wins!');
        resetBoard();
      }, 200);
    } else if (checkDraw()) {
      gameOver = true;
      setTimeout(function() {
        alert('It\'s a draw!');
        resetBoard();
      }, 200);
    } else {
      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
  }
}

function checkWin(player) {
  for (let combo of winningCombos) {
    if (
      cells[combo[0]].innerText === player &&
      cells[combo[1]].innerText === player &&
      cells[combo[2]].innerText === player
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  for (let cell of cells) {
    if (cell.innerText === '') {
      return false;
    }
  }
  return true;
}

function highlightWinningCombo(player) {
  for (let combo of winningCombos) {
    let cell1 = cells[combo[0]];
    let cell2 = cells[combo[1]];
    let cell3 = cells[combo[2]];

    if (
      cell1.innerText === player &&
      cell2.innerText === player &&
      cell3.innerText === player
    ) {
      cell1.classList.add('win');
      cell2.classList.add('win');
      cell3.classList.add('win');
      break;
    }
  }
}

function resetBoard() {
  currentPlayer = 'X';
  gameOver = false;
  for (let cell of cells) {
    cell.innerText = '';
    cell.className = 'cell';
  }
}
