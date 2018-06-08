triviaObj = {

    //questions array  https://quizlet.com/3017165/sit104-flash-cards/
    questions: [{
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ["javascript", "js", "scripting", "script"],
        correctAnswer: "script",

    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        answers: ["script href=xxx.js", "script src=xxx.js", "script name=xxx.js", "script img=xxx.js"],
        correctAnswer: "script src=xxx.js",

    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: ["alert('Hello World')", "alertBox('Hello World')", "msg('Hello World')", "msgBox('Hello World')"],
        correctAnswer: "alert('Hello World')",

    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: ["if i = 5", "if i = 5 then", "if i == 5 then", "if (i == 5)"],
        correctAnswer: "if (i == 5)",

    },
    {
        question: "How can you add a comment in a JavaScript?",
        answers: ["'This is a comment", "//This is a comment", "!--This is a comment--", "This is a comment"],
        correctAnswer: "//This is a comment",

    },
    ],

    //correct guesses
    guessesCorrect: 0,

    //incorrect guesses
    guessesIncorrect: 0,

    // unanswered from timer
    unAnsweredGuesses: 0,

    //array for current question selected from Questions
    currentQuestion: [],

    currentGuesses: "",

    userGuess: "",

    timerCount: 10,

    masterIndex: "",

    //start timer
    pageLoad: {
        //start counter
        run: function() {
            counter = setInterval(this.decrement, 1000);
        },
        
        // decrease counter timeer
        decrement: function() {

            // Show the number in the #show-number tag.
            $('#timer').html('<h2>' + 'Time Remaining: ' + triviaObj.timerCount + '</h2>');
            // Decrease number by one.
            triviaObj.timerCount--;
        },

        //stop the counter
        stop: function() {
            clearInterval(counter);
        }
    },

    

    timerReset: function() {
        var timerCount = 0;
        return timerCount;
        $('#timer').html('<h2>' + 'Time Remaining: ' + triviaObj.timerCount + '</h2>');
    },
    
    questionLoad: function() {
        this.timerCount = 10;

        // Show the number in the #show-number tag.
        $('#timer').html('<h2>' + 'Time Remaining: ' + 10 + '</h2>');
        this.pageLoad.run();

        // This pushes the random picked question object to the current question array
        this.currentQuestion.push(this.randomPick());

        console.log("Current Question: " + JSON.stringify(this.currentQuestion));
        $('#question').html('<h2>' + triviaObj.currentQuestion[0].question + '<h2>');

        // Setting the variable of current answers equal to the answers section with the current question array
        var currentAnswers = this.currentQuestion[0].answers

        // stores get element in variable parent 
        var parent = document.getElementById('answers');

        //  a for each function that runs for every answer in the array
        currentAnswers.forEach(function(answer, index, array) {
            // creates a p element
            var div = document.createElement('div');
            // Add other classes to update the background
            div.setAttribute('class', 'col-sm-12 col-md-6 col-lg-6 guess center-block');

            // storing creating a text node of answer in text
            var text = document.createTextNode(answer);
            // appending text to the previously created p tag
            div.appendChild(text);
            // appending the child to the parent in this case the p tag to the parent variable
            parent.appendChild(div);

        });
    },

    // Randomly picks the next question
    randomPick: function() {
    
        this.Index = Math.floor(Math.random() * this.questions.length);
        var pick = this.questions[this.Index];

        console.log("Initial Pick: " + JSON.stringify(pick));
        return pick;
    },



    // Empty currently divs with questions and answers
    emptyDivs: function() {
        $('#question').empty();
        $('#correctAnswer').empty();
        $('#timer').empty();
    },

    // The time up function
    timesUp: function() {
        $('#timer').attr('style', 'font-size: 40px;').html('Times UP!');
        $('#correctAnswer').html('The Correct Answer Is: ' + '<span>' + triviaObj.currentQuestion[0].correctAnswer + '</span>');
        console.log(triviaObj.currentQuestion[0].correctAnswer);

    },

    // Correct Guess function
    correctGuess: function() {
        $('#question').attr('style', 'font-size: 40px;').html('Correct!');
        this.pageLoad.stop();
    },

    // Incorrect guess function
    incorrectGuess: function() {
        $('#timer').attr('style', 'font-size: 40px;').html('Wrong!');
        $('#correctAnswer').html('The Correct Answer Is: ' + '<span>' + triviaObj.currentQuestion[0].correctAnswer + '</span>');
        this.pageLoad.stop();
    },

    summaryPage: function() {

        $('#question').html('<h2>' + 'Your game: ' + '</h2>');

        // display correct guesses
        $('#answers').html("<p>" + "Correct Guesses: " + triviaObj.guessesCorrect + "</p>");

        // display incorrect guesses
        $('#answers').append("<p>" + "Incorrect Guesses: " + triviaObj.guessesIncorrect + "</p>");

        // display unanswered guesses
        $('#answers').append("<p>" + "Unanswered Guesses: " + triviaObj.unansweredGuesses + "</p>");
    },
}

//Game Logic

$(document).ready(function() {

    // Intial page load with the button created dynamically
    var b = $('<button>');
    b.addClass('waves-effect waves-light btn-lg text-center startButton');
    b.html('START!');

    $('#start').append(b);


    //load page after user click
    $('#start').on('click', function(event) {
        $(this).hide();
        triviaObj.questionLoad();

    });

    //check for user guess
    $(document.body).on('click', '.guess', function(event) {
        var click = $(this).text();
        //initialize a question
         // console.log("you clicked: " + click);
        triviaObj.pageLoad.stop();

        //correct guess
        if (click == triviaObj.currentQuestion[0].correctAnswer) {

           
            triviaObj.emptyDivs();
            triviaObj.correctGuess();
            triviaObj.guessesCorrect++; 
            console.log("This is the user pick: " + click);
            console.log("This is the correct answer: " + triviaObj.currentQuestion[0].correctAnswer);
            console.log("Guesses Correct: " + triviaObj.guessesCorrect);   
            triviaObj.emptyDivs();
            triviaObj.currentQuestion = [];        
          

        //incorrect guess
        }else if (click != triviaObj.currentQuestion[0].correctAnswer) {
            
            triviaObj.emptyDivs();
            triviaObj.incorrectGuess();
            triviaObj.guessesIncorrect++;
            console.log("This is the user pick: " + click);
            console.log("This is the correct answer: " + triviaObj.currentQuestion[0].correctAnswer);
            console.log("Guesses Correct: " + triviaObj.guessesCorrect);   
            triviaObj.emptyDivs();
            triviaObj.currentQuestion = [];   
            
            
        }

        console.log(triviaObj.guessesCorrect.length)
        if (triviaObj.guessesCorrect === 5) {
        // Game is over and display progress

        triviaObj.summaryPage();
        triviaObj.pageLoad.stop();
        } 
        else {
        triviaObj.questionLoad();
        }  

        //Timer hits zero...
        if (triviaObj.timerCount === -1) {
        triviaObj.emptyDivs();
        triviaObj.timesUp();
        triviaObj.unansweredGuesses++;
        console.log("Unanswered Guesses:" + triviaObj.unansweredGuesses);
        triviaObj.questionLoad();

        }
    });
})
