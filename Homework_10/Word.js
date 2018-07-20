// * **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:
var Letter = require("./Letter");

function Word(){

//   * An array of `new` Letter objects representing the letters of the underlying word
    this.LetterArray = word.split("");

//   * A function that returns a string representing the word. 
    this.WordDisplay = function(){
        //This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.
        for(var i=0;i<LetterArray.length;i++){
            Letter.LetterValue = LetterArray[i];
            NewLetterarray[i] = Letter.LetterDisplay[i];
        }
        return NewLetterarray
    }
//   * A function that takes a character as an argument 
}   this.NewFunction = function(char){
    //and calls the guess function on each letter object (the second function defined in `Letter.js`)
    for(var i=o;i<LetterArray.length;i++){
        Letter.LetterValue = LetterArray[i];
        Letter.LetterCheck(char)
    }
}
module.exports = Word;