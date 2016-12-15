console.log('Hello frontend');

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded");
    var player1 = 'x';
    var player2 = 'o';
    var currentPlayer = player1;
    var scorePlayer1 = 0;
    var scorePlayer2 = 0;
    var clicks = 0;
    var isGameOver = false;
    var ai;
    var play = document.getElementById('play').addEventListener('click', startGame);

    function startGame() {
        var columns = $('.columns');
        for (i = 0; i < columns.length; i++) {
            columns[i].addEventListener('click', columnClicked);
            // console.log('columns have event listeners');
        }
        // if ($('#1player').checked === true)
        //     ai = player1;
        //     aimove();
        // }
        resetGame();
    }
    //
    // function aimove() {
    //     var b = Math.floor(Math.random() * 7);
    //     if (currentPlayer = ai) {
    //         columnClicked('column' + b);
    //     }
    // }

    function columnClicked() {
        if (isGameOver === true) {
            return;
        }

        for (i = (this.children.length - 1); i > -1; i--) {
            if (this.children[i].textContent !== player1 && this.children[i].textContent !== player2) {
                this.children[i].textContent = currentPlayer;
                getColRow(this.children[i].id);
                currentPlayer = changeTurn(currentPlayer);
                piecePlayed = true;
                clickCounter();
                break;
            } else {
                piecePlayed = false;
            }
        }
        if (piecePlayed === true) {
            $('#currPlay')[0].textContent = currentPlayer + '\'s move';
        } else {
            $('#currPlay')[0].textContent = 'Column full; choose another move';
        }
    }

    function clickCounter() {
        clicks += 1;
        console.log('counter works', clicks);
        if (clicks > 41) {
            catsGame();
        }
        return clicks;
    }

    function changeTurn(currentPlayer) {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        $('#currPlay').textContent = 'Current player: ' + currentPlayer;
        return currentPlayer;
    }

    function getColRow(id) {
        col = parseInt(id.split('-')[0]);
        row = parseInt(id.split('-')[1]);
        return checkForWin(col, row);
    }

    function checkForWin(col, row) {
        for (col = 0; col < 7; col++) {
            for (row = 0; row < 6; row++) {
                checkCells(col, row);
            }
        }
    }

    function checkCells(col, row) {
        // checks vertically
        areFourCellsEqual(col, row, col + 1, row, col + 2, row, col + 3, row);
        // checks horizontally
        areFourCellsEqual(col, row, col, row + 1, col, row + 2, col, row + 3);
        // checks diagonally
        areFourCellsEqual(col, row, col + 1, row + 1, col + 2, row + 2, col + 3, row + 3);
        // checks diagonally
        areFourCellsEqual(col, row, col - 1, row + 1, col - 2, row + 2, col - 3, row + 3);
    }

    function areFourCellsEqual(col1, row1, col2, row2, col3, row3, col4, row4) {
        var cell1 = getCell(col1, row1);
        var cell2 = getCell(col2, row2);
        var cell3 = getCell(col3, row3);
        var cell4 = getCell(col4, row4);

        if (cell1 === false || cell2 === false || cell3 === false && cell4 === false) {
            return false;
        } else if (cell1.textContent === cell2.textContent &&
            cell1.textContent === cell3.textContent &&
            cell1.textContent === cell4.textContent &&
            cell1.textContent !== '') {
            console.log(currentPlayer + ' wins!!!');
            $('#display')[0].textContent = currentPlayer + " wins!!!";
            addPointToScore();
            gameOver();
            return true;
        }
        return false;
    }

    function getCell(col, row) {
        if (col < 0 || row < 0 || col > 6 || row > 5) {
            return false;
        }
        id = $("#" + col + "-" + row)[0];
        return id;
    }

    function addPointToScore() {
        if (currentPlayer == player1) {
            scorePlayer1++;
            $('#scorePlayer1')[0].textContent = 'Player1 Wins: ' + scorePlayer1;
        } else {
            scorePlayer2++;
            $('#scorePlayer2')[0].textContent = 'Player2 Wins: ' + scorePlayer2;
        }
    }

    function catsGame() {
        $('#display')[0].textContent = 'Nobody wins, you both lose a point!!!';
        console.log('cats game');
        subtractPointFromScore();
        gameOver();
    }

    function subtractPointFromScore() {
        console.log('subtracting from score');
        scorePlayer1--;
        scorePlayer2--;
        $('#scorePlayer1')[0].textContent = 'Player1 Wins: ' + scorePlayer1;
        $('#scorePlayer2')[0].textContent = 'Player2 Wins: ' + scorePlayer2;
    }

    function gameOver() {
        isGameOver = true;
    }

    $("#restart").click(resetGame);

    function resetGame() {
        currentPlayer = player1;
        clicks = 0;
        for (i = 0; i < $('.cell').length; i++) {
            $('.cell')[i].textContent = '';
            $('#display')[0].textContent = '';
        }
        isGameOver = false;
    }
    $("#newMatch").click(resetMatch);

    function resetMatch() {
        console.log('reset match works');
        scorePlayer1 = 0;
        scorePlayer2 = 0;
        $('#scorePlayer1')[0].textContent = 'Player1 Wins: ' + scorePlayer1;
        $('#scorePlayer2')[0].textContent = 'Player2 Wins: ' + scorePlayer2;
        resetGame();
    }
});
