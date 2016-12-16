console.log('Hello frontend');

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded");

    document.body.styke.zoom = '90%';
    var player1 = '<img class="piecez" src="images/pieces.png">';
    var player2 = '<img class="piecez" src="images/pieces2.png">';
    var currentPlayer = player1;
    var scorePlayer1 = 0;
    var scorePlayer2 = 0;
    var clicks = 0;
    var isGameOver = false;
    // var ai = '<img class="piecez" src="images/pieces2.png">';
    var play = document.getElementById('play').addEventListener('click', startGame);

    function startGame() {
        var columns = $('.columns');
        for (i = 0; i < columns.length; i++) {
            columns[i].addEventListener('click', columnClicked);
        }
        resetGame();
        modeCheck();
    }

    function modeCheck() {
        console.log('mode check works');
        if ($('#2players').checked === true) {
            return true;
        } else {
            ai = player2;
            console.log(ai);
            return false, ai;
        }
    }

    function columnClicked() {
        if (isGameOver === true) {
            return;
        }
        for (i = (this.children.length - 1); i > -1; i--) {
            if (this.children[i].innerHTML !== player1 && this.children[i].innerHTML !== player2) {
                this.children[i].innerHTML = currentPlayer;
                getColRow(this.children[i].id);
                currentPlayer = changeTurn(currentPlayer);
                piecePlayed = true;
                clickCounter();
                break;
            } else {
                piecePlayed = false;
            }
        }
        if (piecePlayed === true && isGameOver === false) {
            $('#currPlay')[0].innerHTML = currentPlayer + '\'s move';
        }
        if (piecePlayed === false && isGameOver === false) {
            $('#currPlay')[0].innerHTML = 'Column full; choose another move';
        }
        if (isGameOver === true) {
            $('#currPlay')[0].innerHTML = "";
        }
    }

    function clickCounter() {
        clicks += 1;
        console.log('counter works', clicks);
        if (modeCheck() === true) {
            if (clicks > 41) {
                catsGame();
            }
        } else {
            if (clicks > 20) {
                catsGame();
            }
        }
        return clicks;
    }

    function changeTurn(currentPlayer) {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        $('#currPlay').innerHTML = 'Current player: ' + currentPlayer;
        if (modeCheck() === true && currentPlayer === player2) {
            console.log('changeturn modecheck is true and ais turn');
            aiMove();
        }
        return currentPlayer;
    }


    function aiMove() {
        var column = Math.floor(Math.random() * 7);
        var row = Math.floor(Math.random() * 6);
        var aiPiecePlayed = $('#' + column + '-' + row);
        if (aiPiecePlayed.innerHTML !== player1 && aiPiecePlayed.innerHTML !== player2) {
            aiPiecePlayed.innerHTML = currentPlayer;
            checkForWin();
            currentPlayer = changeTurn(currentPlayer);
            piecePlayed = true;
            clickCounter();
        } else {
            aiMove();
        }

        if (piecePlayed === true && isGameOver === false) {
            $('#currPlay')[0].innerHTML = currentPlayer + '\'s move';
        }
        if (piecePlayed === false && isGameOver === false) {
            $('#currPlay')[0].innerHTML = 'Column full; choose another move';
        }
        if (isGameOver === true) {
            $('#currPlay')[0].innerHTML = "";
        }
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
        } else if (cell1.innerHTML === cell2.innerHTML &&
            cell1.innerHTML === cell3.innerHTML &&
            cell1.innerHTML === cell4.innerHTML &&
            cell1.innerHTML !== '') {
            console.log(currentPlayer + ' wins!!!');
            $('#display')[0].innerHTML = currentPlayer + " wins!!!";
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
            $('#scorePlayer1')[0].innerHTML = 'Player1 Wins: ' + scorePlayer1;
        } else {
            scorePlayer2++;
            $('#scorePlayer2')[0].innerHTML = 'Player2 Wins: ' + scorePlayer2;
        }
    }

    function catsGame() {
        $('#display')[0].innerHTML = 'Nobody wins, you both lose a point!!!';
        console.log('cats game');
        subtractPointFromScore();
        gameOver();
    }

    function subtractPointFromScore() {
        console.log('subtracting from score');
        scorePlayer1--;
        scorePlayer2--;
        $('#scorePlayer1')[0].innerHTML = 'Player1 Wins: ' + scorePlayer1;
        $('#scorePlayer2')[0].innerHTML = 'Player2 Wins: ' + scorePlayer2;
    }

    function gameOver() {
        isGameOver = true;
    }

    $("#restart").click(resetGame);

    function resetGame() {
        currentPlayer = player1;
        clicks = 0;
        for (i = 0; i < $('.cell').length; i++) {
            $('.cell')[i].innerHTML = '';
            $('#display')[0].innerHTML = '';
        }
        isGameOver = false;
    }
    $("#newMatch").click(resetMatch);

    function resetMatch() {
        console.log('reset match works');
        scorePlayer1 = 0;
        scorePlayer2 = 0;
        $('#scorePlayer1')[0].innerHTML = 'Player1 Wins: ' + scorePlayer1;
        $('#scorePlayer2')[0].innerHTML = 'Player2 Wins: ' + scorePlayer2;
        resetGame();
    }
});
