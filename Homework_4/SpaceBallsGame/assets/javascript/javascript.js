// Overall game is stored in object
// game play object houses all functions  and additional variables of the game

function reset(){
    window.gameObj = {
        //initialize buttons to false 

        //array of possible charactures to select from (name, picture, health attack and counter attack)

        //varriables , init game, null charchoice, null enemy choice, init blank eneiems fought, null current attack power


    }
};


//Setup the new game

$(document).ready(function(){
    
    //init varraibles thorugh reset
    reset();

    //init all other game varriables and push to document

    function render() {

        //varriables match to html id tags

        //dynamically updated templates

        //set to no char selected

        //setup initial screen of char

    }

    // select a characture
    $('#characterList').on('click', '.characterContainer', function(e){

        //get info for char selected

        //render and update html

    })

    // select enemy
    $('#enemyList').on('click', '.characterContainer', function(e){

        //get info for char selected

        //render and update html
    })

    //game play, attack button
    $('#attackBtn').on('click', function(e) {
         //don't click without char selected

         //record attack to true

         //increment attack power

         //decrease enemy health

         //win?

         //lose?
    })


})

