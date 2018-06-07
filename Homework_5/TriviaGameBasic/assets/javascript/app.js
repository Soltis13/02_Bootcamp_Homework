// jQuery Ready Function waits for the document to complete loading before initiating JavaScript
$(document).ready(function() {

    // When random-button is clicked...
    $("#startButton").on("click", function() {

        var settimer;

        settimer = setTimeout(function() {
          twentyseconds()
        }, 20000);
    },

    function twentyseconds() {
    console.log("20 seconds")
    window.location = answers.html;
    },



}