module.exports = class Gol {

    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.board = [];
        for (let row = 0; row < this.height; ++row) {
            let tmp = [];
            for (let col = 0; col < this.height; ++col) {
                tmp.push(0);
            }
            this.board.push(tmp);
        }
    }

    /**
     * Copies Passed in board to "this".Board
     */
    copyBoard(tmpBoard) {
        for (let r = 0; r < this.height; ++r) {
            for (let c = 0; c < this.height; ++c) {
                this.board[r][c] = tmpBoard[r][c];
            }
        }
    }

    /**
     * Returns a grid state
     */
    getGrid() {
        return this.board;
    }

    /**
     * Gets neighbors of a cell
     * @param {Row} i 
     * @param {Col} j 
     */
    getNeighbors(i, j) {
        //Search each space next to our specified cell and determine
        //if it has a neighbor
        var numN = 0;

        // let y = this.height;
        // let x = this.width;

        let y = this.width;
        let x = this.height;

        //We are given the position of the cell we want to check via i = row, c = col;
        //We check the neighbers
        //m = row, n = col
        for (let m = -1; m <= 1; m++) {
            for (let n = -1; n <= 1; n++) {
                if (i == 0 && (j != 0 || j != y - 1) && m == -1) {
                    continue;
                } else if (j == 0 && (i != 0 || i != x - 1) && n == -1) {
                    continue; F
                } else if (i == x - 1 && (j != 0 || j != y - 1) && m == 1) {
                    continue;
                } else if (j == y - 1 && (i != 0 || i != x - 1) && n == 1) {
                    continue;
                } else if (i == 0 && j == 0 && (m == -1 || n == -1)) {
                    continue;
                } else if (i == 0 && (j == y - 1) && (m == -1 || n == 1)) {
                    continue;
                } else if ((i == x - 1) && (j == y - 1) && (m == 1 || n == 1)) {
                    continue;
                } else if ((i == x - 1) && (j == 0) && (m == 1 || n == -1)) {
                    continue;
                } else {
                    if (this.board[m + i][n + j] == 1) {
                        numN++;
                    }
                }
            }
        }
        //Offset numNeigh by 1 to account for looping over the cell we are looking at
        if (this.board[i][j] == 1) {
            numN--;
        }
        return numN;
    }

    /**
     * Mutates grid according to conways rules 
     */
    mutate() {
        let tempGrid = [];
        for (let row = 0; row < this.height; ++row) {
            let tmp = [];
            for (let col = 0; col < this.height; ++col) {
                tmp.push("0");
            }
            tempGrid.push(tmp);
        }

        for (let r = 0; r < this.height; ++r) {
            for (let c = 0; c < this.width; ++c) {
                let numNeigh = this.getNeighbors(r, c);

                if (numNeigh < 2 && this.board[r][c] == 1) {
                    tempGrid[r][c] = 0;

                } else if (this.board[r][c] == 1 && (numNeigh == 2 || numNeigh == 3)) {
                    tempGrid[r][c] = 1;
                } else if (numNeigh > 3 && this.board[r][c] == 1) {
                    tempGrid[r][c] = 0;

                } else if (numNeigh == 3 && this.board[r][c] == 0) {
                    tempGrid[r][c] = 1;
                }
            }
        }

        this.copyBoard(tempGrid);
    }

    /**
	 * Print a representation of the board to the terminal.
	 */
    printBoard() {
        for (let i = 0; i < this.height; ++i) {
            for (let j = 0; j < this.width; ++j) {
                if (this.board[i][j] == 1) {
                    process.stdout.write('1\t')
                } else {
                    process.stdout.write(this.board[i][j] + "\t")
                }
            }
            console.log();
        }
    }
}

// let g = new Gol(5, 5);
// let tmp = [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 1, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]];
// g.copyBoard(tmp);
// // g.printBoard();
// // g.mutate();
// // g.printBoard();

// let h = 0;
// while (h < 10) {
//     console.log();
//     g.printBoard();
//     g.mutate();
//     h++;
// }