
//https://developers.giphy.com/docs/

// Initial array of animals
var animals = ["dog", "cat", "rabbit", "hamster"];
var animalImage = [];
var animalImageStill = [];

//ajax request for animal image
function displayAnimalInfo() {

  var animal = $(this).attr("data-name");
  var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=uCLeg25EeeHs21O7Ch1AZ99lwrT9czak&limit=10");

  xhr.done(function(data) {
    console.log("Success got data", data);

  // })
 
  // // Creating an AJAX call for the specific movie button being clicked
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function(data) {

  var results = data.data;


    for(var i = 0; i < results.length; i++){

      var gifDiv = $("<div class='item col-md-3' >");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      imageDiv = $("<img>");
      animalImage = $("<img>");
      animalImageStill = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height.url);
      animalImageStill.attr("src", results[i].images.fixed_height_still.url);
        //console.log(data.data[i]);

        
        imageDiv.addClass("_Giphy");
        imageDiv.attr("data-state", "still");
        imageDiv.attr("data-still", animalImageStill);
        imageDiv.attr("data-animate", animalImage);
      
      gifDiv.append(p);
      gifDiv.append(animalImage);

      $("#animals-view").prepend(gifDiv);
    }


  });
};

//function to rendering animal buttons
function renderButtons() {

  //delete the prioir animals before adding new
  $("#buttons-view").empty();

  //loop thorugh array of animals
  for (var i = 0; i < animals.length; i++){

    //generate button for each animal in array
    var a = $("<button>");
    //adding class for animal-btn
    a.addClass("animal-btn btn btn-primary ");
    //adding a data-attribute
    a.attr("data-name", animals[i]);
    //providing an initial button text
    a.text(animals[i]);
    //adding the button to the html div
    $("#buttons-view").append(a);
  };
};

//onclick event of button click
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  //grap the input from text box
  var animal = $("#animal-input").val().trim();

  //adding animal from the text box to array of annimals
  animals.push(animal);

  //calling the render button function
  renderButtons();

});

//function to click and still images
function pausePlayGifs() {
  var state = $(this).attr("data-state");
  console.log(state)
  console.log(this)
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");

  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");

  };
};

//Click event on gifs with class of "_Giphy" executes pausePlayGifs function
$(document).on("click", "._Giphy", pausePlayGifs);

//onclick event for all animal-btn elements
$(document).on("click", ".animal-btn", displayAnimalInfo);

//call renderbutton to display inital buttons from intial array
renderButtons();