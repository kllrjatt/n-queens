// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
    _             _     _
    ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
    
    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      // get the row to check where there is a conflict 
      // this.get helps get correct location 
      //assign the array at the rowIndex to a variable
      var row = this.get(rowIndex);
      //declare count to keep track of pieces on the board. 
      // 0 is no piece, 1 is piece 
      var total = 0;
      // iterate throw the row on the board 
      for (var i = 0; i < row.length; i++) {
        // add all elements in the array 
        total += row[i];
      }
      // if total is larger than 1 , there is collision 
      return total > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      // use this.get to get the size of the board 
      var boardSize = this.get('n');
      // iterate through each row of the board to check if there is collisom
      for (var i = 0; i < boardSize; i++) {
        if (this.hasRowConflictAt(i)) {
          //return true if there is a collision on any row 
          return true;
        }
      }
      // return false if there are no collision 
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      // get the boardSize of the board 
      var boardSize = this.get('n');
      // declare a temp variable for total 
      var total = 0;
      // use boardSize to iterate through the board 
      for (var i = 0; i < boardSize; i++) {
        // use this. get to the row in which you want to check for collision 
        var row = this.get(i);
        // add all elements in all rows in colIndex
        total += row[colIndex];
      }
      //if there is a collision the sum total will be greater than one 
      return total > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      //get board size 
      var boardSize = this.get('n');
      // iterate through the board 
      for (var i = 0; i < boardSize; i++) {
        // check for each coloum on board for conflicts 
        if (this.hasColConflictAt(i)) {
          // if there is a conflict return true 
          return true;
        }
      }
      // if there is no conflicts, return false 
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      // shorten argument name
      var majorDiag = majorDiagonalColumnIndexAtFirstRow;
      //generate a new board
      var boardSize = this.rows();
      // use a var to keep track of values in matrix 
      var total = 0;
      // iterate through the boardSize length
      for (var i = 0; i < boardSize.length; i++) {
        // check if a value is present at a given index location in the matrix 
        if (boardSize[i][i + majorDiag]) {
          // add value to total if there is something present 
          total = total + boardSize[i][i + majorDiag];
        }
      }
      // if total is larger than 1, then there is conflict , else not 
      return total > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      // find the board size 
      var boardSize = this.rows();
      //iterate the baord size 
      // diag vs chess board size is a diffrence of 2 for n>2
      // use ghost array to do standard iteration 
      // corrners do not have diagnoal 
      //iterate through ONLY length -1 
      for (var i = 2 - boardSize.length; i < boardSize.length - 1; i++) {
        // check if each row has a conflict 
        if (this.hasMajorDiagonalConflictAt(i)) {
          //return true for conflict 
          return true;
        }
      }

      //return false if no conlicts are found
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      // rename argument
      var minorDiag = minorDiagonalColumnIndexAtFirstRow;
      //generate new board 
      var boardSize = this.rows();
      console.log(boardSize);
      // write variable to hold diag values
      var total = 0;
      //iterate through the boardSize 
      for (var i = 0; i < boardSize.length; i++) {
        // check to see if there is a value at given location 
        // ghost arrays
        if (boardSize[i][minorDiag - i]) {
          // add value if value is present
          total = total + boardSize[i][minorDiag - i];
        }
      }
      return total > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      // create a new board 
      var boardSize = this.rows();
      //iterate through the board to check if there is a minor diagonal conflict 
      for (var i = 1; i < 2 * (boardSize.length - 1); i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
