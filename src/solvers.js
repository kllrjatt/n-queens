/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function (n) {
  // create a new board
  var board = new Board({ n: n });
  // itreate through col and rows in nested loops
  for (var col = 0; col < n; col++) {
    for (var row = 0; row < n; row++) {
      //toogle piece at starting index
      board.togglePiece(row, col);
      //check if there is a conflict
      if (board.hasAnyRooksConflicts()) {
        //untoggle if there is conflic 
        board.togglePiece(row, col);
        // keep looping
      }
    }
  }
  // return final status of the baord
  return board.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  //create a new board 
  var newBoard = new Board({ n: n });
  //create counter for total solutions
  var totalSolutions = 0;
  // write inner recursive solution that checks for all possible combinations
  // inner solution uses current row to check for possible solution
  var countRooks = function (currentRow) {
    // define base case for inner recursive 
    // if current row is final row on board, incriment solution and end loop 
    // final row is n -1 as n is size of board, and rows start from 0
    // u can do currentRow + 1 ... 
    //max rooks is ONLY n on any chess board 
    if (currentRow === n) {
      totalSolutions++;
      return;
    }
    //iterate through the chess table, n is the size of the table 
    for (var i = 0; i < n; i++) {
      // place a rook on a location on the board 
      newBoard.togglePiece(currentRow, i);
      // check to see if that causes a conflict 
      if (!newBoard.hasAnyRooksConflicts()) {
        // move to the next box and repeate 
        countRooks(currentRow + 1);
      }
      // if there is a conflict , then remove the piece
      newBoard.togglePiece(currentRow, i);
    }
  };
  // invoke inner recursive on first locaiton of chess board 
  // regardless of size u need to start from zero 
  countRooks(0);
  // return total number of solutions
  return totalSolutions;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  //create a new board 
  var newBoard = new Board({ n: n });
  //create counter for total solutions
  var totalSolutions = 0;
  // write inner recursive solution that checks for all possible combinations
  // inner solution uses current row to check for possible solution

  var countQueens = function (currentRow) {
    // define base case for inner recursive 
    // if current row is final row on board, incriment solution and end loop 
    // final row is n -1 as n is size of board, and rows start from 0
    if (currentRow === n) {
      totalSolutions++;
      return;
    }

    //iterate through the chess table, n is the size of the table 
    for (var i = 0; i < n; i++) {
      // place a rook on a location on the board 
      newBoard.togglePiece(currentRow, i);
      // check to see if that causes a conflict 
      if (!newBoard.hasAnyQueensConflicts()) {
        // move to the next box and repeat
        countQueens(currentRow + 1);
      }
      // if there is a conflict , then remove the piece
      newBoard.togglePiece(currentRow, i);
    }
  };

  // write solution for edge cases 
  // no solution for 2 or 3 
  if (n === 2 || n === 3) {
    return 0;
  } else if (n === 1 || n === 0) {
    return 1;
  } else {
    // invoke inner recursive on first locaiton of chess board 
    // regardless of size u need to start from zero 
    countQueens(0);
  }
  // return total number of solutions
  return totalSolutions;

};
