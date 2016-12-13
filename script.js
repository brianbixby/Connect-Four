console.log('Hello frontend');

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded");
    var player1 = 'x',
        player2 = 'o';
    unplayed = '';
    var currentPlayer = player1;
    var winner;
    var ai;
    var play = document.getElementById('play').addEventListener('click', startGame);

    function startGame() {
        var columns = $('.columns');
        for (i = 0; i < columns.length; i++) {
            columns[i].addEventListener('click', columnClicked);
            console.log('columns have event listeners');
        }
    }

    function columnClicked() {
        var piecePlayed = false;
        //        for (i = 5; i < this.children.length; i--)
        //    Adjusted loop limits since we're counting down. Test against -1, cuz 0 is a valid array element.
        for (i = (this.children.length - 1); i > -1; i--) {
            if (this.children[i].value !== player1 && this.children[i].value !== player2) {
                this.children[i].value = currentPlayer;
                this.children[i].innerHTML = currentPlayer;
                piecePlayed = true;
                getColRow(this.children[i].id);
                currentPlayer = changeTurn(currentPlayer);
                break;
            } else {}
        }
        if (piecePlayed === false) {
            $('#currPlay').innerHTML('Column full; choose another move');
        }
        return piecePlayed;
    }

    function changeTurn(currentPlayer) {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        $('#currPlay').innerHTML = 'Current player: ' + currentPlayer;
        return currentPlayer;
    }

    function getColRow(id) {
        col = parseInt(id.split('-')[0]);
        row = parseInt(id.split('-')[1]);
        // console.log('getColRow works ' + col, row);
        return checkForWin(col, row);
    }

    function checkForWin(col, row) {
        for (col = 0; col < 3; col++) {
            for (row = 0; row < 2; row++) {
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
        // areFourCellsEqual(col, row, col - 1, row - 1, col - 2, row - 2, col - 3, row - 3);
    }

    function areFourCellsEqual(col1, row1, col2, row2, col3, row3, col4, row4) {
        // console.log('parameters', col1, row1, col2, row2, col3, row3, col4, row4);
        // console.log(getCell(col1, row1).innerHTML);
        if (getCell(col1, row1).innerHTML === getCell(col2, row2).innerHTML &&
            getCell(col1, row1).innerHTML === getCell(col3, row3).innerHTML &&
            getCell(col1, row1).innerHTML === getCell(col4, row4).innerHTML &&
            getCell(col1, row1).innerHTML !== '') {
            console.log(currentPlayer + ' wins!!!');
            return true;
        }
        return false;
    }

    function getCell(col, row) {
        id = $("#" + col + "-" + row)[0];
        return id;
    }

    var reset = document.getElementById('reset').addEventListener('click', function unk() {
        $('.cell').innerHTML = '';
        $('.cell').innerText = '';
        $('.cell').outerText = '';
        startGame();
    });

    function gameOver() {
        if (areFourCellsEqual === true) {

        }
    }
});

// function getRow(id) {
//     var row = parseInt(id.split('-')[1]);
//     return row;
// }

// function getCol(id) {
//     var col = parseInt(id.split('-')[0]);
//     return col;
// }
//
//
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









//



// }
//


//
//
// var cell = $('.cell');
// for (i = 0; i < cell.length; i++) {
//     xVal = parseInt(cell[i].id.split('-')[0]);
//     yVal = parseInt(cell[i].id.split('-')[1]);
//     cellVal = (xVal, yVal);
//     console.log(cellVal);
// }

//                 var id = col + "-" + row;
//     function rc (row, col) {
//     if (row >= 5 && col >= 6) {
//         return true;
//     }
//     return false;
// }
// }
