// Game Object
triviaObj = {

    //Array of Questions  https://quizlet.com/3017165/sit104-flash-cards/
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

    //Define Varriables
        //correct guesses
        correctGuesses: 0,
        //incorrect guesses
        incorrectGuesses: 0,
        //unanswered guesses
        unAnsweredGuesses: 0,
        //timerCounter
        timerCount: 10,
        //currentQuestion array
        currentQuestion: [],
        //currentAnswer string
        currentAnswer: [],
        //UserGuess string
        userGuess: "",

        clockRunning: false,

        openQuestion: false,

        currentTime: 11,

        questionCounter: 0,

 


    // game functions
    
        //Load Start button
        pageLoad: {

            start: function() {
            b = $('<button>'),
            b.addClass('waves-effect waves-light btn-lg text-center startButton')
            b.html('START!')
        
            $('#start').append(b);
            },

            next: function(){
                b = $('<button>'),
                b.addClass('waves-effect waves-light btn-lg text-center startButton')
                b.html('NEXT')
            
                $('#next').append(b);
            }
        },

        //timer
        stopwatch: {

            intervalId: "",

            time: 10,
                            

            //reset counter
            reset: function() {

                triviaObj.stopwatch.time = 10;
                triviaObj.openQuestion = true;

                            
                //  TODO: Change the "display" div to "00:00."
                $("#timer").html('<h2>'+"Time Remaining: 10"+'<h2>')
        
            },
            //start counter
            start: function() {

                if (triviaObj.clockRunning === false) {
                  triviaObj.stopwatch.intervalId = setInterval(triviaObj.stopwatch.count, 1000);
                  triviaObj.clockRunning = true;
                }
            },
            //stop counter
            stop: function() {
                
                clearInterval(triviaObj.stopwatch.intervalId);
                triviaObj.clockRunning = false;
            },
            //decrease counter
            count: function() {
                console.log(triviaObj.stopwatch.time)
                //  TODO: increment time by 1, remember we cant use "this" here.
                  triviaObj.stopwatch.time--;
                //  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
                //        and save the result in a variable.
                currentTime = triviaObj.stopwatch.timeConverter(triviaObj.stopwatch.time);
            
                //  TODO: Use the variable you just created to show the converted time in the "display" div.
                $("#timer").html('<h2>' + "Time Remaining: " + currentTime + '<h2>');
            },
        
            //timer coverter
            timeConverter: function(t) {

                //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
                var minutes = Math.floor(t / 60);
                var seconds = t - (minutes * 60);
            
                if (seconds < 10) {
                  seconds = "0" + seconds;
                }
            
                if (minutes === 0) {
                  minutes = "";
                }
            
                else if (minutes < 10) {
                  minutes = "" + minutes;
                }
            
                return minutes + "" + seconds;
            },
        },

        //load question from array
        questionLoad: function(i) {

            // pull question infomation
            triviaObj.currentQuestion = triviaObj.questions[i]
            console.log(triviaObj.currentQuestion.answers.length)
            console.log(triviaObj.currentQuestion.answers)
            // set answer equal to answer
            triviaObj.currentAnswer =  triviaObj.currentQuestion[1]
            console.log(triviaObj.currentAnswer)
            // push infomration to html
        },


        //empty html divs
            //set all div equal to blank
        emptyDivs: function() {
            $('#question').empty();
            $('#answer').empty();
            $('#correctAnswer').empty();
        },

        //time is up 
            //add to unanswered gueses string
        timesUp: function() {
            $('#timer').attr('style', 'font-size: 40px;').html('Times UP!');
            unAnsweredGuesses++;
        },

        //incorrect guess
            //add to incorrect guesses string

        //correct guess
            //add to correct guesses string

        //end of - summary page
            //display
                //correct guesses
                //incorrect guesses
                //unanswered guesses

    
};
//Game Logic //triviaObj.

    //document ready
    $(document).ready(function() {    

        //Load page and watch for start button press
        triviaObj.pageLoad.start()

        
        $("#start").on('click', function(event){
            $(this).hide();
            triviaObj.stopwatch.reset()
 
        console.log(triviaObj.clockRunning)
        console.log(triviaObj.openQuestion)

        //for i in array ,numnber of questions in array
        if(triviaObj.openQuestion === true){
            console.log(triviaObj.clockRunning)

        
            //load next button
            triviaObj.pageLoad.next()

            


            triviaObj.stopwatch.start()
            console.log(triviaObj.currentTime)
     
            

            

            // clear div of content
            triviaObj.emptyDivs();

            //load question
            triviaObj.questionLoad(triviaObj.questionCounter);
           


            if(triviaObj.currentTime > 0) {
                //call start timer
    
                //watch for on click of next
                $("#next").on('click', function(event){
                    triviaObj.stopwatch.stop()

                    triviaObj.questionCounter++;

                    if(triviaObj.userGuess === triviaObj.currentAnswer){
                        triviaObj.correctAnswer++;
                    }
                    else if(triviaObj.userGuess !== triviaObj.currentAnswer){
                        triviaObj.incorrectGuesses++;
                    }
                    
                })

                
                console.log("Times up")
                //stop timer
                //triviaObj.stopwatch.stop()

                //clear dives of content

                //add to question unanswered
                //triviaObj.unAnsweredGuesses++

                //load next question
            }  


            
            

            


      
        }
        })



        
        //load end page and print out 
    });