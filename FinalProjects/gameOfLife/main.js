//Import our game of life definitions
const gol = require('./gol.js');

//Import a-synchronous prompt library
const prompt = require('prompt-sync')();

/**
 * Save File
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
 * This is where the program executes
 */
function start() {

    //Prompt the user to enter a filename
    let fs = require('fs');
    fi = prompt("Enter a file Name: ");

    //Load the board and check the dimensions
    //If either dimension doesn't meet our requirements
    //Exit the program and print a message
    // let boardToLoad = JSON.parse(fs.readFileSync(fi, 'utf8'));
    let boardToLoad = loadFile(fi);
    if ((boardToLoad.height > 30 || boardToLoad.height < 1) ||
        (boardToLoad.width > 30 || boardToLoad.width < 1)) {
        console.log("Please Enter Valid Board Dimensions!");
        process.exit(1);
    }
    
    //If we made it this far, we can load the board and start the 
    //Simulation
    let golInstance = new gol(boardToLoad.height, boardToLoad.width);
    golInstance.copyBoard(boardToLoad.board);
    golInstance.printBoard();

    //Execute the simulation loop
    while (true) {
        console.log();
        console.log("Q - Quit");
        console.log("N - Iterate N Times");
        console.log("W - Save Current Board State");
        console.log("Anything Else to Iterate once!");

        let usrTyped = prompt("What will it be?: ");
        switch (usrTyped.toUpperCase()) {
            case "Q":
                process.exit(1);
                break;
            case "W":
                let newName = prompt("What Should I save it as?: ");
                saveFile(newName, golInstance);
                break;
            case "N":
                let iterations = prompt("How many times?: ");
                for (let i = 0; i < iterations; ++i) {
                    golInstance.mutate();
                    golInstance.printBoard();
                    console.log();
                }
                break;
            default:
                golInstance.mutate();
                golInstance.printBoard();
        }
    }
}
console.clear();
start();