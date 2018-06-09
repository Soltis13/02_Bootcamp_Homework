// Game Object
triviaObj = {


    //Array of Questions

    //Define Varriables
        //correct guesses
        //incorrect guesses
        //unanswered guesses
        unAnsweredGuesses: 0,
        //timerCounter
        //currentQuestion array
        //currentAnswer string
        //UserGuess string
        clockRunning = false,
        intervalId = "",


    // game functions
    
        //Load Start button

        //timer
        stopwatch: {
            //reset counter
            reset: function() {

                stopwatch.time = 0;
                stopwatch.lap = 1;
            
                //  TODO: Change the "display" div to "00:00."
                $("#timer").html("Time Remaining: 00")
        
            },
            //start counter
            start: function() {

                if (!clockRunning) {
                  intervalId = setInterval(stopwatch.count, 10);
                  clockRunning = true;
                }
            },
            //stop counter
            stop: function() {
                
                clearInterval(intervalId);
                clockRunning = false;
            },
            //decrease counter
            count: function() {

                //  TODO: increment time by 1, remember we cant use "this" here.
                  stopwatch.time++
                //  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
                //        and save the result in a variable.
                var currentTime = stopwatch.timeConverter(stopwatch.time)
            
                //  TODO: Use the variable you just created to show the converted time in the "display" div.
                $("#timer").html("Time Remaining: " + currentTime)
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
                  minutes = "00";
                }
            
                else if (minutes < 10) {
                  minutes = "0" + minutes;
                }
            
                return minutes + ":" + seconds;
            },
        },

        //load question from array
            //for i in array 
            // pull question infomation
            // set question equal to question
            // set answer equal to answer
            // push infomration to html

        //empty html divs
            //set all div equal to blank
            emptyDivs: function() {
                $('#question').empty();
                $('#answer').empty();
                $('#correctAnswer').empty();
                $('#timer').empty();
                $('#start').empty();
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
//Game Logic

    //document ready

        //Load page and watch for start button press

        //for numnber of questions in array

            // clear div of content

            //load question 

            //call start timer

            //watch for on click of next
                
                //stop timer

                //look for user guess

                //clear divs of content

                //add to question answered (right or wrong or unanswered)

                //load next question
            
            //watch for timer = 0

                //stop timer

                //clear dives of content

                //add to question unanswered

                //load next question
        
        //load end page and print out 