//#!/bin/bash


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
	let boardToLoad = JSON.parse(fs.readFileSync(file, 'utf8'));
	return boardToLoad.board;
}

/**
 * Driver function.  "main" method, if you will.
 */
function start() {

	let p1Disc = prompt("Enter Your Disc Color B or W: ");
	var p2Disc = p1Disc;
	var turn = 1;
	if (p1Disc === "B") {
		var p2Disc = "W";
	} else {
		var p2Disc = "B"
	}

	console.log();
	console.log("<<<<<Welcome To othello!>>>>>");
	console.log("Player 1: " + p1Disc + " Player 2: " + p2Disc);
	console.log("Player " + turn + " will start the game!");
	let myBoard = new board(8, 8);
	myBoard.initBoard();
	//myBoard.board = loadFile("test1.json");
	// console.log(myBoard.board);

	var row, col;
	while (!myBoard.isGameOver(myBoard.board)) {
		myBoard.printBoard();
		if (!myBoard.isValidMoveAvailable((turn === 1 ? p1Disc : p2Disc))) {
			console.log("No Valid moves available for player " + turn + " you will lose your turn");
		} else {
			do {
				console.log("To Quit, Enter Q in both prompts");
				var row = prompt("Player: " + turn + " ,Enter the location row to place your disc: ");
				var col = prompt("Player: " + turn + " ,Enter the location col to place your disc: ");
				if (row < 1 || row > 8 || col < 1 || col > 8) {
					console.log("Sorry, invalid input. Try again");
					continue;
				} else if (row === "Q") {
					process.exit(1);
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

	let winner = myBoard.checkWinner();
	if(winner == "B" || winner == "W") {
		console.log("The winner was " + winner);
	} else {
		console.log("Game is over, there was no winner");
	}
	process.exit(1);

}

console.clear();
start();
