/**
 * Othello
 * Javascript project for CIS 343.
 * Command-line version of Othello.
 */

// Import our board definitions
const board = require('./board.js');
// Import a synchronous prompt library
const prompt = require('prompt-sync')();

/**
 * saveFile
 * SYNCHRONOUS (blocking) file save function.
 * @param file - The full filename path we want to save to.
 * @param contents - The object we wish to save as a JSON file.
 */
function saveFile(file, contents) {
	let fs = require('fs');
	fs.writeFileSync(file, JSON.stringify(contents));
}

/**
 * loadFile
 * SYNCHRONOUS (blocking) file read function.
 * @param file - The full filename path we wish to load an object from.
 * @return contents - The object converted from JSON.
 */
function loadFile(file) {
	let fs = require('fs');
	try {
		let boardToLoad = JSON.parse(fs.readFileSync(file, 'utf8'));
		return boardToLoad;
	} catch (err) {
		console.log("Sorry, I couldn't find that file!")
		process.exit(1);
	}
}

/**
 * Driver function.  "main" method, if you will.
 */
function start() {

	//Prompt player one to choose their disc
	//Player 2 will be the other disc
	let p1Disc = prompt("Enter Your Disc Color B or W: ").toUpperCase();
	var p2Disc = p1Disc;
	var turn = 1;
	if (p1Disc.toUpperCase() === "B") {
		var p2Disc = "W";
	} else if(p1Disc.toUpperCase() === "W") {
		var p2Disc = "B";
	} else {
		console.log("Sorry! Invalid Disc selection, Exiting!");
		process.exit(1);
	}

	console.log();
	console.log("<<<<<Welcome To othello!>>>>>");
	console.log("Player 1: " + p1Disc + " Player 2: " + p2Disc);
	console.log("Player " + turn + " will start the game!");


	//Prompt the user to enter the height/width of the gameboard
	//Boards not of even dimensions and less than size 4
	//Will not be allowed
	let size = prompt("Please Enter the size for your board (enter size M for MxM): ");
	//let width = prompt("Please enter a width for your board: ");
	if(size % 2 != 0){
		console.log("You must have a board with even dimensions!")
		process.exit(1);
	} else if (size < 4) {
		console.log("That would be too small of a board, Try again!");
		process.exit(1);
	}
	 

	var myBoard = new board(size, size);
	myBoard.initBoard();

	//Ask user if they want to load a file, if they do load it,
	//if not continue with the original game board
	let wantToLoad = prompt("Do you want to load a file Y or N? This will reset your chosen board dimensions!: ");
	//let wantToLoad = "N";
	if (wantToLoad.toUpperCase() === "Y") {
		let fileName = prompt("Enter a file name: ")
		var loadData = loadFile(fileName);
		myBoard = new board(loadData.size, loadData.size);
		myBoard.board = loadData.board;
	} else if (wantToLoad.toUpperCase() === "N") {
		console.log("Continuing Game...");
	} else {
		console.log("Sorry I don't know what that is, Exiting!");
		process.exit(1);
	}

	//Main Game loop
	var row, col;
	while (!myBoard.isGameOver(myBoard.board)) {
		myBoard.printBoard();
		if (!myBoard.isValidMoveAvailable((turn === 1 ? p1Disc : p2Disc))) {
			console.log("No Valid moves available for player " + turn + " you will lose your turn");
		} else {
			do {
				console.log("To Quit, Enter Q ");
				var row = prompt("Player: " + turn + " ,Enter the location row to place your disc: ");
					isQuit(row);
				var col = prompt("Player: " + turn + " ,Enter the location col to place your disc: ");
					isQuit(col);

				//Check if the user input is a number,
				//If not, check if it is the game over identifier 'Q'
				//If it is, exit the program, else tell the user they entered something invalid
				
				if (row < 1 || row > myBoard.size || col < 1 || col > myBoard.size) {
					console.log("Sorry, invalid input. Try again");
					continue;
				}

				row--;
				col--;
				if (!myBoard.isValid(row, col, (turn === 1 ? p1Disc : p2Disc))) {
					console.log("Sorry, Invalid move, try again");
					continue;
				}
				break;
			} while (true);
			myBoard.placeDiskAt(row, col, (turn === 1 ? p1Disc : p2Disc));
		}
		turn = turn === 1 ? 2 : 1;
	}

	//Find the winner if there is one
	//Print a unique message and exit the game
	let winner = myBoard.checkWinner();
	if (winner == "B" || winner == "W") {
		console.log("The winner was " + winner);
	} else {
		console.log("Game is over, there was no winner");
	}
	process.exit(1);
}


function isQuit(quit){
	if(isNaN(quit) ) {
		if(quit.toUpperCase() == "Q" ) {
			console.log("Exiting, As requested");
			process.exit(1);
			} else {
			console.log("Sorry, Invalid Input. Try again!");
			}
			}
}

console.clear();
start();
