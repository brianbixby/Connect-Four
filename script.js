console.log('Hello frontend');

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded");
    var player1 = 'x',
        player2 = 'o',
        unplayed = '';
    var currentPlayer = player1;
    var scorePlayer1 = 0;
    var scorePlayer2 = 0;
    var gameStatus = 0; // 0 is not currently in a game and 1 is currently in a game
    var winner;
    var ai;
    var play = document.getElementById('play').addEventListener('click', startGame);

    function startGame() {
        var columns = $('.columns');
        for (i = 0; i < columns.length; i++) {
            columns[i].addEventListener('click', columnClicked);
            console.log('columns have event listeners');
            gameStatus = 1;
        }
    }

    function columnClicked() {
        for (i = (this.children.length - 1); i > -1; i--) {
            if (this.children[i].textContent !== player1 && this.children[i].textContent !== player2) {
                this.children[i].textContent = currentPlayer;
                getColRow(this.children[i].id);
                currentPlayer = changeTurn(currentPlayer);
                piecePlayed = true;
                break;
            } else {
                piecePlayed = false;
            }
        }
        if (piecePlayed === true) {
            $('#currPlay')[0].textContent = currentPlayer + "/'s move";
        } else {
            $('#currPlay')[0].textContent = 'Column full; choose another move';
        }
        return piecePlayed;
    }

    function changeTurn(currentPlayer) {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        $('#currPlay').textContent = 'Current player: ' + currentPlayer;
        return currentPlayer;
    }

    function getColRow(id) {
        col = parseInt(id.split('-')[0]);
        row = parseInt(id.split('-')[1]);
        return checkForWin(col, row), checkForWin2(col, row);
    }

    function checkForWin(col, row) {
        for (col = 0; col < 3; col++) {
            for (row = 0; row < 2; row++) {
                checkCells(col, row);
            }
        }
    }

    function checkForWin2(col, row) {
        for (col = 6; col > 3; col--) {
            for (row = 0; row < 2; row++) {
                checkCells2(col, row);
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
    }

    function checkCells2(col, row) {
        // checks second diagonal
        areFourCellsEqual(col, row, col - 1, row + 1, col - 2, row + 2, col - 3, row + 3);
    }

    function areFourCellsEqual(col1, row1, col2, row2, col3, row3, col4, row4) {
        // console.log('parameters', col1, row1, col2, row2, col3, row3, col4, row4);
        // console.log(getCell(col1, row1).textContent);
        if (getCell(col1, row1).textContent === getCell(col2, row2).textContent &&
            getCell(col1, row1).textContent === getCell(col3, row3).textContent &&
            getCell(col1, row1).textContent === getCell(col4, row4).textContent &&
            getCell(col1, row1).textContent !== '') {
            console.log(currentPlayer + ' wins!!!');
            $('#display')[0].textContent = currentPlayer + " wins!!!";
            addPointToScore();
            gameStatus = 0;
            return true;
        }
        return false;
    }

    function getCell(col, row) {
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
        for (i = 0; i < $('.cell').length; i++) {
            if (($('.cell').textContent == player1 | player2) && areFourCellsEqual() === false) {
                $('#display')[0].textContent = "Nobody wins, you both lose a point!!!";
                subtractPointFromScore();
                gameover();
                return true;
            }
        }
    }

    function subtractPointFromScore() {
        if (catsGame() === true) {
            scorePlayer1--;
            scorePlayer2--;
            $('#scorePlayer1')[0].textContent = 'Player1 Wins: ' + scorePlayer1;
        } else {
            $('#scorePlayer2')[0].textContent = 'Player2 Wins: ' + scorePlayer2;
        }
    }

    function gameOver() {
        if (areFourCellsEqual === true | catsGame === true) {
            gameStatus = 0;
        }
    }

    $("#restart").click(resetGame);

    function resetGame() {
        currentPlayer = player1;
        for (i = 0; i < $('.cell').length; i++) {
            $('.cell')[i].textContent = '';
            // startGame();
        }
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



// function hover() {
//     if ($('.columns').hover) {
//         $(this).css("background-color", "yellow");
//     }
// }


// function checkForWin(col, row) {
//     for (col = 0; col < 6; col++) {
//         for (row = 0; row < 5; row++) {
//             var cell = $("#" + col + "-" + row);
//             if ($("#" + col + "-" + row).innerHTML == $("#" + (col + 1) + "-" + row).innerHTML &&
//                 $("#" + col + "-" + row).innerHTML == $("#" + (col + 2) + "-" + row).innerHTML &&
//                 $("#" + col + "-" + row).innerHTML == $("#" + (col + 3) + "-" + row).innerHTML && row <= 5 && col <= 6) {
//                 console.log('Checking for horizontal win');
//                 alert(currentPlayer + 'wins!!!');
//                 return true;
//             } else if ($("#" + col + "-" + row).innerHTML == $("#" + col + "-" + (row + 1)).innerHTML &&
//                 $("#" + col + "-" + row).innerHTML == $("#" + col + "-" + (row + 2)).innerHTML &&
//                 $("#" + col + "-" + row).innerHTML == $("#" + col + "-" + (row + 3)).innerHTML && row <= 5 && col <= 6) {
//                 console.log('Checking for vertical win');
//                 alert(currentPlayer + 'wins!!!');
//                 return true;
//             } else if ($("#" + col + "-" + row).innerHTML == $("#" + (col + 1) + "-" + (row + 1)).innerHTML && $("#" + col + "-" + row).innerHTML == $("#" + (col + 2) + "-" + (row + 2)).innerHTML &&
//                 $("#" + col + "-" + row).innerHTML == $("#" + (col + 3) + "-" + (row + 3)).innerHTML && row <= 5 && col <= 6) {
//                 console.log('Checking for diagonal-right win');
//                 alert(currentPlayer + 'wins!!!');
//                 return true;
//             } else if ($("#" + col + "-" + row).innerHTML == $("#" + (col - 1) + "-" + (row + 1)).innerHTML && $("#" + col + "-" + row).innerHTML == $("#" + (col - 2) + "-" + (row + 2)).innerHTML &&
//                 $("#" + col + "-" + row).innerHTML == $("#" + (col - 3) + "-" + (row + 3)).innerHTML && row <= 5 && col <= 6) {
//                 console.log('Checking for diagonal-left win');
//                 alert(currentPlayer + 'wins!!!');
//                 return true;
//             } else
//                 console.log('Checking for win: Not a winner');
//             return false;
//         }
//     }
// }
