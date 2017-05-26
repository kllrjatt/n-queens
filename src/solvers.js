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
  //  MY Partner's implimentation' -- comments by me 

  // generate a new board 
  var newBoard = new Board({ n: n });
  // generate a solutions array to hold first possible solution 
  var solution = [];

  // write inner function to find solution on board using togglePiece 
  // function takes a starting index, boardsize and the newly generated board
  var toggleSolution = function (index, num, board) {
    // define base case for function 
    if (index === num) {
      // use map to convert newboard to a matrix 
      solution = _.map(newBoard.rows(), function (row) {
        // slide each row to get current state of the board 
        return row.slice();
      });
      // return the solution matrix 
      return solution;
    }

    // iterate through the board 
    for (var i = 0; i < num; i++) {
      // for the starting location use passed in index and i 
      board.togglePiece(index, i);
      // check to see if there are any queen conflict
      if (!board.hasAnyQueensConflicts()) {
        // if there are conflicts, call recursive function to test against the board 
        toggleSolution(index + 1, num, board);
      }
      // if there are no conflicts toogle the next location 
      board.togglePiece(index, i);
    }
  };
  // check for edge cases 
  if (n === 0) {
    // retun empty array for size 0 
    return [];
    // return empty board for n2 and n3 
  } else if (n === 2 || n === 3) {
    return newBoard.rows();
    // return single solution for size 1 
  } else if (n === 1) {
    return [[1]];
    // check for recursive solution with toggle for n >=4
  } else {
    toggleSolution(0, n, newBoard);
  }
  // return final solution array 
  return solution;
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
