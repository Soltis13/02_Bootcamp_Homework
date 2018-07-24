// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:
var Word = require("./Word");
var inquirer = require('inquirer');
var prompt = require('prompt');

//   * Randomly selects a word and uses the `Word` constructor to store it
//word array
var ListArray = ["Cars",'Food','Coding','Household']
var Cars = ['mercedes','lambo','porshe'];
var Food = ['d','e','f'];
var Coding = ['g','h','i'];
var Household = ['j','k','l'];

var RandomNumber=0
var ArrayToGuess=[]
var WordToGuess=""
var CurrentGuesses='';
var WordToGuessString=''
var WordToGuessArray=[];

//random number 0-4
function randomNumInt(min, max){ //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);//set minimum value
    max = Math.floor(max);//set max value
    return Math.floor(Math.random() * (max - min)) + min; //returns range min =< x < max (does not include max)
};


//Game Section

//function start game
function StartNewGame(){
    //clear variables
    var RandomNumber=0
    var ArrayToGuess=[]
    var WordToGuess=""
    var CurrentGuesses='';
    var WordToGuessString=''
    var WordToGuessArray=[];
    //Welcome the user
    console.log("Welcome to the word guessing game.\n\n")
    //prompt for starting input
    inquirer.prompt([
        {
            type: "input",
            message: "Would you like to start a New Game Y/N",
            name: "NewGame",
            validate: function validateUserGuess(name){
                if((name === "n"||name === "no")){
                    process.exit();
                }         
                else if(name === "y"||name === "yes")  {
                    return true;
                }       
            }
        },
        {
            type: "list",
            name: 'theme',
            message: 'What category do you wish to play?',
            choices: ListArray,

        }
    ]).then(answers =>{
        //console.log(answers)
        for(var i=0;i<ListArray.length;i++){
            //console.log(ListArray[i] +" "+answers.theme)
            if(answers.theme=== "Cars"){
                ArrayToGuess = Cars;
            }else if(answers.theme === "Food"){
                ArrayToGuess = Food;
            }else if(answers.theme === "Coding"){
                ArrayToGuess = Coding;
            }else if(answers.theme === "Household"){
                ArrayToGuess = Household;
            }
        }
          
        //word type (choose word array based on criteria)
        //define word to guess as random word from choosen array
        RandomNumber = randomNumInt(0,ArrayToGuess.length)
        WordToGuessString = ArrayToGuess[RandomNumber]
        for(var i=0;i<WordToGuessString.length;i++){
            WordToGuessArray = WordToGuessArray+WordToGuessString[i]+" "
        }
        //console.log(WordToGuess)

        //define guessleft at 6 with new constructed word
        var WordToGuess = new Word(WordToGuessString,6)
        //console.log(WordToGuess)
      
        //function display word
        DisplayWord(WordToGuess,CurrentGuesses,WordToGuessArray) 

    })
}   

StartNewGame()

//function display current word and guesses left
function DisplayWord(WordToGuess,CurrentGuesses,WordToGuessArray )  {
    //hangman
    drawMan(WordToGuess,CurrentGuesses);
    //you have x guess left
    console.log("You have "+WordToGuess.guesses+" guesses left.")
    //currrent word is ______ 
    console.log("The current word is: "+WordToGuess.WordDisplay())
    //user has already guesses
    //console.log(CurrentGuesses)
    var CGuesses='';
    CGuesses = CurrentGuesses
    CGuesses=CGuesses.split("")
    CGuesses = CGuesses.sort()
    CGuesses = CGuesses.toString()
    console.log("You have already guessed: "+CGuesses)
    //run function to input guess
    UserGuessInput(WordToGuess,CurrentGuesses,WordToGuessArray)
}


// function checks guesses left and draws ascii hangman
function drawMan(WordToGuess,CurrentGuesses) {
	let one = '     ========',
	two =     '        |   |',
	three =   '            |',
	four =    '            |',
	five =    '            |',
	six =     '     ========';
//                  ========
//                     |   | 
//                    ()   |
//                    /|\  |
//                    / \  |
//                  ++++++++ 
	switch( WordToGuess.guesses ) {
		case 6: 
			break;
		case 5: 
			three = '       ()   |';
			break;
		case 4:
			three = '       ()   |';
			four =  '        |   |'
			break;
		case 3:
			three = '       ()   |';
			four =  '       /|   |'
			break;
		case 2:
			three = '       ()   |';
			four =  '       /|\\  |'
			break;
		case 1:
			three = '       ()   |';
			four =  '       /|\\  |';
			five =  '       /    |';
			break;
		case 0:
			three = '       ()   |';
			four =  '       /|\\  |';
			five =  '       / \\  |';
			break;
	} 
	 console.log( one );
	 console.log( two );
	 console.log( three );
	 console.log( four );
	 console.log( five );
	 console.log( six );
}

//function to ask user to guess letter 
function UserGuessInput(WordToGuess,CurrentGuesses,WordToGuessArray){
    var re = /([a-z])/;
    inquirer.prompt([
        {
            type: "input",
            message: "Choose a letter",
            name: "UserGuess",
            validate: function validateUserGuess(name){
                //valid guess
                //console.log("\n"+name)
                //console.log(name.length)
                if(!re.exec(name) || name.length!==1){
                    return "Not a valid guess. Choose letters a to z."
                }    //already guessed?
                else if(CheckForGuess(name,CurrentGuesses)=== true){
                    return "You already guessed "+name+", guess again."
                }
                else{return true}
            }
        }      
    ]).then(answers =>{
        //console.log(answers)
        //record guess, 
        CurrentGuesses=CurrentGuesses+answers.UserGuess;

        //check against current newword
        //console.log(WordToGuess)
        //console.log(answers.UserGuess)
        WordToGuess.GuessLetter(answers.UserGuess);
        //console.log(WordToGuess.GuessLetter(answers.UserGuess))
        if(WordToGuess.GuessLetter(answers.UserGuess)===false){
            WordToGuess.guesses = WordToGuess.ReduceGuesses(WordToGuess.guesses)
            //console.log(WordToGuess.guesses)
        }

        //function to check game state
        CheckWord(WordToGuess,CurrentGuesses,WordToGuessArray ) 
    })
}

//check teh users guess against the array of currently already guessed letters
function CheckForGuess(guess,CurrentGuesses){
    for(var i=0;i<CurrentGuesses.length;i++){
        if(guess === CurrentGuesses[i]){
            return true
        }
    }
}

//funciton check if word is fully guessed or if no guesses left
function CheckWord(WordToGuess,CurrentGuesses,WordToGuessArray) {
    //if no guesses left
    console.log(WordToGuess.WordDisplay())
    console.log(WordToGuessArray)
    if(WordToGuess.guesses === 0){
        //run end of game function
        GameOver()
    }
    //if fully guesses
    else if(WordToGuess.WordDisplay() === WordToGuessArray){
         //run you win function
         YouWin()
    }
    //if guesses left and not fully guessed
    else{
        //run display current word 
        DisplayWord(WordToGuess,CurrentGuesses,WordToGuessArray) 
    }

}      

//function to end game
function GameOver(){
    console.log("Game Over")
    StartNewGame()
}

function YouWin(){
    console.log("You Win")
    StartNewGame()
}